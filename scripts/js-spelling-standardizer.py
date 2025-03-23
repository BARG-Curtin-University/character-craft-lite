#!/usr/bin/env python3
import os
import sys
import json
import argparse
from anthropic import Anthropic

def ask(question):
    """
    Prompt the user with a question and return their response.
    
    Args:
        question (str): The question to ask the user
    
    Returns:
        str: The user's response
    """
    return input(question)

def main():
    """
    Main function to standardize American spellings to British/Australian in JavaScript files.
    """
    # Set up command line argument parsing
    parser = argparse.ArgumentParser(description='Standardize American to British/Australian spelling in JavaScript code')
    parser.add_argument('file_path', help='Path to the JavaScript file')
    parser.add_argument('--apply', '-a', action='store_true', 
                       help='Apply the suggested changes automatically (use with caution)')
    parser.add_argument('--output', '-o', help='Output file path (defaults to creating a new file with "-uk" suffix)')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Show more detailed output during processing')
    args = parser.parse_args()
    
    file_path = args.file_path
    
    # Check if file exists
    if not os.path.exists(file_path):
        print('❌ Please provide a valid JavaScript file path.')
        sys.exit(1)
    
    # Read the JavaScript code
    with open(file_path, 'r', encoding='utf-8') as file:
        code = file.read()
    
    # Create the prompt for Claude
    prompt = f"""
Analyze this JavaScript code and identify any instances of American English spelling in:
1. Function names
2. Variable names
3. Object property names
4. Comments
5. String literals

For each instance, suggest the equivalent British/Australian English spelling.
Format your response as a structured JSON object with the following format:

```json
{{
  "american_to_british": {{
    "color": "colour",
    "initialize": "initialise",
    // other word pairs
  }},
  "instances": [
    {{
      "type": "function_name",
      "line": 42,
      "american": "initializeColor",
      "british": "initialiseColour",
      "context": "function initializeColor() {{" 
    }},
    // other instances
  ]
}}
```

The "american_to_british" section should contain direct word mappings,
while the "instances" array should contain specific occurrences in the code
with enough context to locate them.

Only include true spelling differences (color/colour, 
organize/organise), not differences in terminology or phrasing.

Here is the code:
```js
{code}
```

Return only the JSON output, nothing else.
"""
    
    # Initialize the Anthropic client (Claude)
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌ ANTHROPIC_API_KEY environment variable not set.")
        print("Please set your API key with: export ANTHROPIC_API_KEY=your_api_key_here")
        sys.exit(1)
        
    client = Anthropic(api_key=api_key)
    
    print('💬 Analyzing code for American English spellings...')
    
    # Send the request to Claude
    try:
        message = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=4000,
            temperature=0.2,
            system="You are an expert in British/Australian English spelling and JavaScript conventions. Your task is to identify American English spellings in code and suggest British/Australian alternatives.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract the response from Claude
        response_text = message.content[0].text
        
        # Try to parse the JSON from the response
        # First, strip any markdown code block formatting if present
        print("Debug - Original response length:", len(response_text))
        print("Debug - First 100 characters of response:", response_text[:100].replace('\n', ' '))
        
        if "```json" in response_text:
            start = response_text.find("```json") + 7
            end = response_text.rfind("```")
            if start > 7 and end > start:
                response_text = response_text[start:end].strip()
                print("Debug - Extracted from ```json block")
        elif "```" in response_text:
            start = response_text.find("```") + 3
            end = response_text.rfind("```")
            if start > 3 and end > start:
                response_text = response_text[start:end].strip()
                print("Debug - Extracted from generic ``` block")
        
        print("Debug - Processed response length:", len(response_text))
        print("Debug - First 100 characters of processed response:", response_text[:100].replace('\n', ' '))
        
        # Parse the JSON
        try:
            spelling_data = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing Claude's response as JSON: {e}")
            print("Raw response:")
            print(response_text)
            sys.exit(1)
        
        # Display the findings
        word_mappings = spelling_data.get("american_to_british", {})
        instances = spelling_data.get("instances", [])
        
        if not instances:
            print("✅ No American English spellings found in the code.")
            return
        
        print(f"\n🔍 Found {len(instances)} instances of American English spelling:")
        
        for i, instance in enumerate(instances, 1):
            instance_type = instance.get("type", "unknown")
            line = instance.get("line", "unknown")
            american = instance.get("american", "")
            british = instance.get("british", "")
            context = instance.get("context", "")
            
            print(f"\n{i}. {instance_type.upper()} (line {line}):")
            print(f"   American: {american}")
            print(f"   British:  {british}")
            print(f"   Context:  {context}")
            
        print("\n📝 Word mappings (American → British):")
        for american, british in word_mappings.items():
            print(f"   {american} → {british}")
            
        # Handle applying changes
        if len(instances) > 0:
            if args.apply:
                # Auto-apply with --apply flag
                output_path = args.output  # This might be None, which is handled in apply_changes
                apply_changes(file_path, output_path, code, instances)
            else:
                # Interactive mode
                should_apply = ask("\n📊 Would you like to apply these changes? (y/n): ").lower()
                if should_apply in ['y', 'yes']:
                    output_path = args.output
                    if not output_path:
                        output_path = ask(
                            "📁 Enter output file path (or press Enter to create a new file with '-uk' suffix): "
                        )
                    apply_changes(file_path, output_path, code, instances)
                else:
                    print("❌ No changes applied.")
        else:
            print("❌ No changes to apply.")
    
    except Exception as e:
        print(f"❌ Error communicating with Claude API: {e}")
        sys.exit(1)

def apply_changes(file_path, output_path, original_code, instances):
    """
    Apply spelling changes to the code and save to a new file.
    
    Args:
        file_path (str): Original file path
        output_path (str or None): Output file path, if None a default path is created
        original_code (str): Original code content
        instances (list): Instances of spelling to change
    """
    print("\n🔄 Preparing to apply changes...")
    
    # If no output path provided, create one with "-uk" suffix
    if not output_path:
        file_name, file_ext = os.path.splitext(file_path)
        output_path = f"{file_name}-uk{file_ext}"
        print(f"📄 No output path specified, using: {output_path}")
    else:
        print(f"📄 Output will be written to: {output_path}")
    
    print(f"Debug - Output path (absolute): {os.path.abspath(output_path)}")
    print(f"Debug - Current working directory: {os.getcwd()}")
    print(f"Debug - File permission check: {'Writable' if os.access(os.path.dirname(os.path.abspath(output_path)), os.W_OK) else 'Not writable'}")
    
    # Confirm overwrite if output file exists
    if os.path.exists(output_path) and output_path != file_path:
        confirm = ask(f"⚠️ File {output_path} already exists. Overwrite? (y/n): ").lower()
        if confirm not in ['y', 'yes']:
            print("❌ Operation cancelled.")
            return
    
    # Sort instances by line number in descending order to avoid offset issues
    # when making multiple replacements
    sorted_instances = sorted(
        instances, 
        key=lambda x: x.get("line", 0),
        reverse=True
    )
    
    # Copy the original code
    modified_code = original_code
    
    # Process each change - this is a simplified approach and might not work for all cases
    # A more robust solution would involve parsing the JavaScript AST
    print("\n🔄 Applying changes:")
    changes_applied = 0
    
    # Debug - Print the number of instances
    print(f"Debug - Number of instances to modify: {len(sorted_instances)}")
    
    for instance in sorted_instances:
        american = instance.get("american", "")
        british = instance.get("british", "")
        context = instance.get("context", "")
        
        print(f"Debug - Processing instance: {american} → {british}")
        print(f"Debug - Context: '{context}'")
        
        if american and british and context:
            # Check if the context exists in the code
            if context in modified_code:
                print(f"Debug - Found context in code")
                # Handle full context replacement
                new_context = context.replace(american, british)
                old_code = modified_code
                modified_code = modified_code.replace(context, new_context)
                
                # Verify the change was made
                if old_code != modified_code:
                    changes_applied += 1
                    print(f"✓ Replaced: {american} → {british}")
                else:
                    print(f"Debug - WARNING: Code did not change after replacement attempt")
            else:
                print(f"Debug - WARNING: Context not found in code: '{context}'")
        else:
            print(f"Debug - WARNING: Missing data in instance: american={american}, british={british}, context present: {'yes' if context else 'no'}")
    
    # Write the modified code to the output file
    try:
        print(f"Debug - About to write to file: {output_path}")
        print(f"Debug - Modified code length: {len(modified_code)} characters")
        
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(modified_code)
            print(f"Debug - Write operation completed")
        
        # Verify file was created
        if os.path.exists(output_path):
            print(f"Debug - File exists after write: {output_path}")
            print(f"Debug - File size: {os.path.getsize(output_path)} bytes")
        else:
            print(f"Debug - ERROR: File does not exist after write attempt: {output_path}")
            
        print(f"\n✅ Applied {changes_applied} spelling changes to: {output_path}")
    except Exception as e:
        print(f"Debug - ERROR during file write: {str(e)}")
        print(f"Debug - Error type: {type(e).__name__}")
        raise

if __name__ == "__main__":
    main()
