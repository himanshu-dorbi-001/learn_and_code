import random

def roll_dice(number_of_sides):
    rolled_number = random.randint(1, number_of_sides)
    return rolled_number

def main():
    number_of_sides = 6
    keep_rolling = True

    while keep_rolling:
        user_choice = input("Ready to roll? Enter Q to Quit: ")
        if user_choice.lower() != "q":
            dice_value = roll_dice(number_of_sides)
            print("You have rolled a", dice_value)
        else:
            keep_rolling = False
