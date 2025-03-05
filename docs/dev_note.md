# Dev Note

## Testing AI

Brute force way to test AI was at some point to:

- disable input for player with style="display: none" in html
- disable player input logic in logic->attack function with && false
- switch player to AI in loop and disable switching player by commenting it out

This is destroying game but also it is fastest way to test AI.

## Random strategy

Gets a random cell in a range.  
For testing it is done in range CSSSSC, where C is empty and S is 4 cell ship.  
Checks if this shot was taken.  
Gets random cell till it finds new shot.  
Stores shot as taken.  
Returns shot and log info.

## Ship Orientation Strategy

Overview:  
After first hit on a ship, strategy is swiched to 'Ship Orientation Strategy'.  
This is focused on finding cell next to first hit, thereby allowing to detect ship orientation.  
Knowing if it is horizontal or vertical allows better targeting.

Algoritm step by step goes:  
We get hit ship data to help targeting.  
We take hit cell to determine next move.  
We randomly select orientation.  
If we checked left and right already, we switch orientation to vertical.  
If we checked up and down already, we switch orientation to horizontal.

If the orientation is set to horizontal.  
We toss a coin, if true, we go left relative to first hit cell.  
We set index coords of this and store left in Set of checked directions.  
If coint toss was false, we do same for right.

This is done also for vertical orientation and up down direction.  
This produces hits to cells next to original hit.  
To get another hit needed to establish ship orientation.

After second hit, method updateState has info to determine orientation.

## Sink Ship Strategy

When orientation of ship is known it is a tatget for next strategy 'sink ship'.  
Target is set.  
If ship orientation is horizontal, coint toss selects direction left or right.  
Method getLabelsFromSet selects cell most right or left from ship hits.  
Cell is converted to index based cords.  
Cell left or right to it is selected.  
Cell is converted to label based cords.  
Shot is added to taken shots.

## Debuging

getLabelsFromSet should return end of ship.
