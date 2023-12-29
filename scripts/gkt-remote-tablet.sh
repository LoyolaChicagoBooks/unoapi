# Look for George's venv

if [ -f ~/zenv/bin/activate ]; then
   . ~/zenv/bin/activate
fi

REPO_NAME=unoapi
# Build HTML and PDF versions
make html && make latexpdf

if [ -d ~/public_html/${REPO_NAME} ]; then
   rsync -avz ./build/ ~/public_html/${REPO_NAME}
else
   echo "No personal web storage found. Skipping."
fi

find build/latex -name '*.pdf' \
	-exec echo rclone copy {} office-luc:gdemo \; \
	-exec rclone copy {} office-luc:gdemo \; 
