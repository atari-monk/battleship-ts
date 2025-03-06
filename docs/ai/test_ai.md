# Testing AI in Client

Switching of parts to test ai in isolation:  

- disable input for player with style="display: none" in html
- disable player input logic in logic->attack function with && false
- switch player to AI in loop and disable switching player by commenting it out

This is destroying game, but is fastest way to test AI.
