# Look for George's venv

if [ -f ~/zenv/bin/activate ]; then
   . ~/zenv/bin/activate
fi

# Build HTML and PDF versions
make html && make latexpdf

if [ -d ~/public_html/unoapi ]; then
   rsync -avz ./build/ ~/public_html/unoapi
else
   echo "No personal web storage found. Skipping."
fi

rclone copy build/latex/UnoAPI.pdf office-luc:gdemo
