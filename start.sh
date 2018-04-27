#!/bin/bash -v
set -x
set -a
FLASK_APP=auto_run.py
FLASK_DEBUG=1
source .env
concurrently -n "React,Flask" -c "bgBlue.bold,bgMagenta.bold" "npm run start --prefix front_end/" "flask run"
set +b
set +x