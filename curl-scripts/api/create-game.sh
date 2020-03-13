# VARIABLE=VALUE sh curl-scripts/auth/sign-in.sh

curl "https://sei-library-api.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{}'

echo
