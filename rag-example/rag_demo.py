# rag_demo.py
"""
Beginner-Friendly RAG Demo using LlamaIndex (Python)
----------------------------------------------------
This example shows how to:
1. Load markdown documents from the `data/` folder
2. Index them into a vector database
3. Use an LLM (OpenAI) to query across the content

To run:
  pip install -r requirements.txt
  python rag_demo.py
"""

from llama_index import SimpleDirectoryReader, VectorStoreIndex
from llama_index.llms import OpenAI
import os

# Optional: set your OpenAI API key via environment variable or any secure method
os.environ["OPENAI_API_KEY"] = "your-openai-api-key-here"  # Or use dotenv, etc.

# 1. Load markdown files from the `data/` folder
documents = SimpleDirectoryReader("data").load_data()

# 2. Build a vector index from those documents
index = VectorStoreIndex.from_documents(documents)

# 3. Set up the query engine with OpenAI
query_engine = index.as_query_engine(llm=OpenAI())

# 4. Ask a sample question
question = "Summarise the core personality traits of the chatbot."
response = query_engine.query(question)

print("\n>>> QUESTION:", question)
print("\n>>> RESPONSE:\n", response)
