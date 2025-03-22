#!/bin/bash

# Paths
DIST_DIR="../dist"
OUT_FILE="../standalone.html"

# Start fresh
echo "Building standalone HTML..."

# Extract <head> and <body> opening from original HTML
head_content=$(awk '/<head>/,/<\/head>/' "$DIST_DIR/index.html")
body_start=$(awk '/<body[^>]*>/{print; exit}' "$DIST_DIR/index.html")
body_content=$(awk '/<body[^>]*>/,/<\/body>/' "$DIST_DIR/index.html" | sed '1d;$d')

# Inline CSS
css_content=$(<"$DIST_DIR/style.css")
style_tag="<style>
$css_content
</style>"

# Inline JS
js_content=$(<"$DIST_DIR/index.js")
script_tag="<script type=\"module\">
$js_content
</script>"

# Compose new HTML
{
  echo "<!DOCTYPE html>"
  echo "<html lang=\"en\">"
  echo "$head_content"
  echo "$style_tag"
  echo "</head>"
  echo "$body_start"
  echo "$body_content"
  echo "$script_tag"
  echo "</body>"
  echo "</html>"
} > "$OUT_FILE"

echo "✅ Standalone HTML built: $OUT_FILE"
