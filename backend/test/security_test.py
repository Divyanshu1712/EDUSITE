from core.security import create_access_token, decode_access_token

token = create_access_token({"user_id": "123", "role": "USER"})
print(token)

payload = decode_access_token(token)
print(payload)