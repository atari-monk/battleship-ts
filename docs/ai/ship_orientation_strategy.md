# Ship Orientation Strategy

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
