# hey.

if you came here from my post, then you probably know what's going on.

Otherwise, the TL;DR is that cookie clicker seeds some of its values (like grimoire spells) by changing the result of `Math.random()`. This is then "reset" by seeding it again without an argument. 

But it's not really a reset, instead the seeding function just creates its own value, effectively making `Math.random()` still seeded. If we expose this seed with some simple code, then all future values can be predicted.


# things to note

- if you're in the main game, the seed changes rapidly. As in every frame. This is due to the fact that the game uses a seeded value to position building sprites.
- if you're in a menu, the seed never changes.

