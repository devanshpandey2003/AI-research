#!/bin/bash
# Startup script for backend deployment

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Start the LangGraph server
exec langgraph up --config langgraph.json --port ${PORT:-8000} --host 0.0.0.0
