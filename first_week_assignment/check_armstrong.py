def calculate_armstrong_sum(number):
    digit_sum = 0
    digit_count = 0

    temp_number = number
    while temp_number > 0:
        digit_count += 1
        temp_number //= 10

    temp_number = number
    for _ in range(1, temp_number + 1):
        digit = temp_number % 10
        digit_sum += digit ** digit_count
        temp_number //= 10

    return digit_sum

input_number = int(input("\nPlease Enter the Number to Check for Armstrong: "))

if input_number == calculate_armstrong_sum(input_number):
    print(f"\n {input_number} is an Armstrong Number.\n")
else:
    print(f"\n {input_number} is NOT an Armstrong Number.\n")
