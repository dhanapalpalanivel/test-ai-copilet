#!/usr/bin/env sh

# Advisory hook: remind the agent to validate JIRA story title pattern.
# Input: JSON payload on stdin.

DEFAULT_PATTERN='^US-[A-Z]+-[0-9]{3}: .+'
PAYLOAD="$(cat)"
PAYLOAD_LC="$(printf '%s' "$PAYLOAD" | tr '[:upper:]' '[:lower:]')"

has_jira=$(printf '%s' "$PAYLOAD_LC" | grep -E 'jira' >/dev/null 2>&1; echo $?)
has_hint=$(printf '%s' "$PAYLOAD_LC" | grep -E 'pattern|regex' >/dev/null 2>&1; echo $?)
has_default=$(printf '%s' "$PAYLOAD_LC" | grep -E '\^us-\[a-z\]\+\-\[0-9\]\{3\}:' >/dev/null 2>&1; echo $?)

if [ "$has_jira" -eq 0 ] && { [ "$has_hint" -eq 0 ] || [ "$has_default" -eq 0 ]; }; then
  printf '{"continue":true}'
  exit 0
fi

printf '{"continue":true,"systemMessage":"JIRA title naming regex not detected. Validate generated story titles with: %s. If your team uses a different pattern, ask the user to provide it before final output."}' "$DEFAULT_PATTERN"
exit 0
