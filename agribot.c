/*
    AgriBot - Smart Agriculture Assistant
    C Programming IDT Project Prototype

    Compile:
        gcc agribot.c -o agribot

    Run:
        ./agribot        (Linux/macOS)
        agribot.exe      (Windows)
*/

#include <stdio.h>
#include <string.h>
#include <ctype.h>

void clearInput(void) {
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) {
        /* discard remaining input */
    }
}

void toLowerCase(char text[]) {
    int i;
    for (i = 0; text[i] != '\0'; i++) {
        text[i] = (char)tolower((unsigned char)text[i]);
    }
}

void cropSelection(void) {
    int soil;

    printf("\n--- CROP SELECTION ---\n");
    printf("Select your soil type:\n");
    printf("1. Black soil\n");
    printf("2. Red soil\n");
    printf("3. Sandy soil\n");
    printf("4. Loamy soil\n");
    printf("Enter choice: ");

    if (scanf("%d", &soil) != 1) {
        printf("Invalid input. Please enter a number.\n");
        clearInput();
        return;
    }
    clearInput();

    switch (soil) {
        case 1:
            printf("\nPossible crops: cotton, soybean, jowar and some pulses.\n");
            break;
        case 2:
            printf("\nPossible crops: ragi, groundnut and selected pulses.\n");
            break;
        case 3:
            printf("\nPossible crops: groundnut, millets and selected pulses.\n");
            break;
        case 4:
            printf("\nPossible crops: maize, vegetables and pulses may be suitable.\n");
            break;
        default:
            printf("\nInvalid soil type selection.\n");
    }

    printf("Note: Final crop choice depends on season, rainfall, water "
           "availability and local agricultural advice.\n");
}

void irrigationGuidance(void) {
    int moisture;

    printf("\n--- IRRIGATION GUIDANCE ---\n");
    printf("Select the soil moisture condition:\n");
    printf("1. Dry soil\n");
    printf("2. Moist soil\n");
    printf("3. Waterlogged soil\n");
    printf("Enter choice: ");

    if (scanf("%d", &moisture) != 1) {
        printf("Invalid input. Please enter a number.\n");
        clearInput();
        return;
    }
    clearInput();

    switch (moisture) {
        case 1:
            printf("\nThe soil may need irrigation. Check moisture near "
                   "the crop roots before watering.\n");
            break;
        case 2:
            printf("\nContinue monitoring soil moisture. Irrigate only "
                   "when required by the crop and its growth stage.\n");
            break;
        case 3:
            printf("\nAvoid adding more water. Check field drainage and "
                   "prevent waterlogging.\n");
            break;
        default:
            printf("\nInvalid moisture condition.\n");
    }

    printf("The exact water requirement depends on crop, soil, growth "
           "stage and weather.\n");
}

void pestDiseaseSupport(void) {
    int symptom;

    printf("\n--- PEST AND DISEASE SUPPORT ---\n");
    printf("Select the symptom observed:\n");
    printf("1. Yellow leaves or spots\n");
    printf("2. Holes in leaves / insects\n");
    printf("3. Wilting or rotting\n");
    printf("4. Other symptoms\n");
    printf("Enter choice: ");

    if (scanf("%d", &symptom) != 1) {
        printf("Invalid input. Please enter a number.\n");
        clearInput();
        return;
    }
    clearInput();

    switch (symptom) {
        case 1:
            printf("\nYellow leaves or spots may be caused by nutrient "
                   "deficiency, disease, pests or water stress.\n");
            break;
        case 2:
            printf("\nInspect both sides of leaves for insects, eggs and "
                   "feeding damage. Identify the pest before treatment.\n");
            break;
        case 3:
            printf("\nWilting or rotting may be related to water stress, "
                   "root damage or disease. Check soil and roots.\n");
            break;
        case 4:
            printf("\nRecord the crop name and describe the symptoms. "
                   "Consult a local agriculture officer or KVK.\n");
            break;
        default:
            printf("\nInvalid symptom selection.\n");
    }

    printf("Safety: Do not apply pesticides based only on a guess. "
           "Get the problem correctly identified first.\n");
}

void weatherSupport(void) {
    int weather;

    printf("\n--- WEATHER-BASED PRECAUTIONS ---\n");
    printf("Select the expected weather condition:\n");
    printf("1. Heavy rain\n");
    printf("2. High temperature / heat\n");
    printf("3. Cold / frost\n");
    printf("4. Strong wind\n");
    printf("Enter choice: ");

    if (scanf("%d", &weather) != 1) {
        printf("Invalid input. Please enter a number.\n");
        clearInput();
        return;
    }
    clearInput();

    switch (weather) {
        case 1:
            printf("\nCheck field drainage, avoid unnecessary irrigation "
                   "and monitor the official local forecast.\n");
            break;
        case 2:
            printf("\nMonitor soil moisture and crop condition. Where "
                   "needed, irrigate at a suitable time.\n");
            break;
        case 3:
            printf("\nCheck local frost alerts and follow crop-specific "
                   "precautions from agricultural experts.\n");
            break;
        case 4:
            printf("\nAvoid spraying during strong winds because spray "
                   "may drift. Secure vulnerable plants where possible.\n");
            break;
        default:
            printf("\nInvalid weather selection.\n");
    }

    printf("Note: This prototype does not fetch live weather forecasts.\n");
}

void marketInformation(void) {
    printf("\n--- MARKET INFORMATION ---\n");
    printf("Live market prices are not connected in this prototype.\n");
    printf("Crop prices vary by market, date, quality and quantity.\n");
    printf("Before selling, compare the latest prices at nearby APMC "
           "markets and check official market information.\n");
}

void aboutAgriBot(void) {
    printf("\n--- ABOUT AGRIBOT ---\n");
    printf("AgriBot is a Smart Agriculture Assistant developed as an "
           "IDT project.\n");
    printf("It provides basic guidance about:\n");
    printf("1. Crop selection and planning\n");
    printf("2. Irrigation and water usage\n");
    printf("3. Pest and plant disease symptoms\n");
    printf("4. Weather-based precautions\n");
    printf("5. Market information\n");
    printf("\nThe aim is to help farmers make better farming decisions.\n");
}

int main(void) {
    int choice;

    printf("============================================\n");
    printf("       AGRIBOT - SMART AGRICULTURE BOT\n");
    printf("============================================\n");
    printf("Welcome! Your agriculture assistant is ready.\n");

    do {
        printf("\n=============== MAIN MENU ===============\n");
        printf("1. Crop selection\n");
        printf("2. Irrigation guidance\n");
        printf("3. Pest and disease support\n");
        printf("4. Weather-based precautions\n");
        printf("5. Market information\n");
        printf("6. About AgriBot\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("\nInvalid input. Please enter a number from 0 to 6.\n");
            clearInput();
            continue;
        }
        clearInput();

        switch (choice) {
            case 1:
                cropSelection();
                break;
            case 2:
                irrigationGuidance();
                break;
            case 3:
                pestDiseaseSupport();
                break;
            case 4:
                weatherSupport();
                break;
            case 5:
                marketInformation();
                break;
            case 6:
                aboutAgriBot();
                break;
            case 0:
                printf("\nThank you for using AgriBot. Happy farming!\n");
                break;
            default:
                printf("\nInvalid choice. Please select from 0 to 6.\n");
        }

    } while (choice != 0);

    return 0;
}
