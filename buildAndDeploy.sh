#! /bin/bash

REPO="/home/jace/git/news.jace.pro/"
TAILFILE="$REPO".buildlog
echo $(pwd)
#source=script
cd "$REPO"
echo pwd
echo $(pwd)
netlify build 2>&1 | tee $TAILFILE 
netlify deploy --prod
