# Dev Note

## Testing AI

Brute force way to test AI was at some point to:

- disable input for player with style="display: none" in html
- disable player input logic in logic->attack function with && false
- switch player to AI in loop and disable switching player by commenting it out

This is destroying game but also it is fastest way to test AI.
