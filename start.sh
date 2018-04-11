#!/bin/bash -v
set -x
export FLASK_APP=auto_run.py
export FLASK_DEBUG=1
concurrently -n "React,Flask" -c "bgBlue.bold,bgMagenta.bold" "npm run start --prefix front_end/" "flask run"
set +x
