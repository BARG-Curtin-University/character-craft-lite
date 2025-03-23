#!/usr/bin/env python3
import os
import sys
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
    Main function to process a JavaScript file and add JSDoc comments using Claude.
    """
    # Set up command line argument parsing
    parser = argparse.ArgumentParser(description='Add JSDoc comments to JavaScript code using Claude')
    parser.add_argument('file_path', help='Path to the JavaScript file')
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
You are an expert JavaScript developer and technical writer.
Your task is to add proper JSDoc comments to the following JavaScript code.
Instructions:
- Add JSDoc comments above all functions, methods, and classes.
- Use @param and @returns with accurate types.
- Include brief, clear descriptions of what each function does.
- Use TypeScript-style types inside the JSDoc (e.g., {{string}}, {{number}}, {{Promise<Object>}}).
- For async functions, include @async.
- For class constructors, include @constructor.
- Only document public or exported functions (skip internal helpers if unsure).
- Use Australian/British English spelling (e.g., "colour" not "color", "organisation" not "organization").
- Be consistent with existing spelling patterns in the code.
Here is the code:
```js
{code}
```

Please return only the updated code with JSDoc comments added, nothing else.
"""
    
    # Initialize the Anthropic client (Claude)
    client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    
    print('💬 Sending code to Claude...')
    
    # Send the request to Claude
    message = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=4000,
        temperature=0.3,
        system="You are an expert JavaScript developer specializing in adding JSDoc comments to code.",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract the updated code from Claude's response
    updated_code = message.content[0].text
    
    # Strip markdown code block formatting if present
    if updated_code.startswith("```js") or updated_code.startswith("```javascript"):
        # Find the first newline after the opening backticks
        first_newline = updated_code.find('\n')
        if first_newline != -1:
            # Find the closing backticks
            closing_backticks = updated_code.rfind("```")
            if closing_backticks != -1:
                # Extract just the code between the backticks
                updated_code = updated_code[first_newline+1:closing_backticks].strip()
    
    # Ask for output file path
    output_path = ask('📝 Enter output file path (or press Enter to overwrite original): ')
    
    # Use original path if no output path is provided
    if not output_path:
        output_path = file_path
    
    # Write the updated code to the specified file
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(updated_code)
    
    print(f'✅ JSDoc comments added to {output_path}')

if __name__ == "__main__":
    main()