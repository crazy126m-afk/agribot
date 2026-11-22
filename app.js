/*
    AgriBot Pro - Davangere Gen-Z Edition (ದಾವಣಗೆರೆ ಅಗ್ರಿಬಾಟ್ ಆವೃತ್ತಿ)
    Complete Trilingual Smart Agriculture Intelligence with Cyber Aesthetic
    Languages: Kannada (ಕನ್ನಡ), Hindi (हिंदी), English
*/

// Application State
const state = {
    currentTab: 'home',
    lang: 'kn', // Default to Kannada for Davangere
    isSpeaking: false,
    farmProfile: {
        name: "ಬಸವರಾಜ್",
        taluk: "dvg_rural",
        acres: 2.5,
        source: "bhadra"
    }
};

// ================= WEB AUDIO SYNTHESIZER =================
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playBeep(freq = 600, duration = 0.12) {
    if (!audioCtx) return;
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

// ================= TRILINGUAL LOCALIZATION =================
const i18n = {
    kn: {
        tagline: "ಅಗ್ರಿಬಾಟ್ · ದಾವಣಗೆರೆ ಸ್ಮಾರ್ಟ್ ರೈತ ಮಿತ್ರ",
        ticker: "ದಾವಣಗೆರೆ ಹವಾಮಾನ: ವಾತಾವರಣ ಸ್ಪಷ್ಟವಾಗಿದೆ, ನೀರಾವರಿ ಮಾಡಬಹುದು.",
        location: "ದಾವಣಗೆರೆ, ಕರ್ನಾಟಕ (Davangere, KA)",
        weatherStatus: "ಬಿಸಿಲು / Clear Sunny",
        humidity: "ತೇವಾಂಶ (Humidity)",
        wind: "ಗಾಳಿ (Wind)",
        rain: "ಮಳೆ (Rain)",
        quickServices: "ದಾವಣಗೆರೆ ಪ್ರಮುಖ ಸೇವೆಗಳು (Services)",
        cropSelectTitle: "ಬೆಳೆ ಆಯ್ಕೆ",
        cropSelectDesc: "ಮೆಕ್ಕೆಜೋಳ, ಅಡಿಕೆ, ಭತ್ತ",
        doctorTitle: "ಸಸ್ಯ ವೈದ್ಯ",
        doctorDesc: "ಅಡಿಕೆ ಕೊಳೆ & ಲದ್ದಿ ಹುಳು",
        irrigTitle: "ನೀರಾವರಿ & NPK",
        irrigDesc: "ಯೂರಿಯಾ & ಕಾಲುವೆ ಲೆಕ್ಕ",
        mandiTitle: "ದಾವಣಗೆರೆ ದರ",
        mandiDesc: "ಮೆಕ್ಕೆಜೋಳ & ಅಡಿಕೆ ರೇಟ್",
        liveMandi: "ದಾವಣಗೆರೆ APMC ಪ್ರಮುಖ ದರಗಳು (ಕ್ವಿಂಟಾಲ್)",
        viewAll: "View All →",
        helplineTag: "ದಾವಣಗೆರೆ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK)",
        helplineTitle: "ರೈತರ ಸಹಾಯವಾಣಿ (24x7)",
        helplineDesc: "ಟೋಲ್-ಫ್ರೀ ಸಂಖ್ಯೆ: 1551",
        cropFilterTitle: "ದಾವಣಗೆರೆ ಬೆಳೆ ಆಯ್ಕೆ ಎಂಜಿನ್",
        cropFilterDesc: "ಮಣ್ಣು, ಭದ್ರಾ ನೀರಾವರಿ ಮತ್ತು ಋತುವಿನ ಪ್ರಕಾರ",
        soilSelectLbl: "1. ಮಣ್ಣಿನ ಪ್ರಕಾರ (Soil Type)",
        seasonSelectLbl: "2. ಬಿತ್ತನೆ ಋತು (Season)",
        waterSelectLbl: "3. ನೀರಿನ ಲಭ್ಯತೆ (Water Availability)",
        findCropsBtn: "ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ (Find Crops) ✨",
        scannerTitle: "AI ಸಸ್ಯ ರೋಗ ಸ್ಕ್ಯಾನರ್",
        scannerDesc: "ಕ್ಯಾಮರಾ ಮೂಲಕ ಎಲೆಯ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        scanPrompt: "ಕ್ಯಾಮರಾ ಮೂಲಕ ಫೋಟೋ ತೆಗೆಯಿರಿ",
        scanSub: "(ಟ್ಯಾಪ್ ಮಾಡಿ - AI ತಕ್ಷಣ ರೋಗ ಮತ್ತು ಔಷಧ ತಿಳಿಸುತ್ತದೆ)",
        scanningActive: "AI ಎಲೆ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
        symptomTitle: "ದಾವಣಗೆರೆ ಪ್ರಮುಖ ಬೆಳೆಗಳ ರೋಗಲಕ್ಷಣ ತಪಾಸಣೆ",
        docCropLbl: "ಬೆಳೆಯ ಪ್ರಕಾರ (Select Crop)",
        docSymptomLbl: "ಬೆಳೆಯಲ್ಲಿ ಕಂಡುಬರುವ ಲಕ್ಷಣಗಳೇನು?",
        diagnoseBtn: "ರೋಗ ಗುರುತಿಸಿ ಮತ್ತು ನಿಖರ ಔಷಧ ನೋಡಿ 🔍",
        irrigCardTitle: "ದಾವಣಗೆರೆ ಭದ್ರಾ ನೀರಾವರಿ ನಿರ್ವಹಣೆ",
        irrigCardDesc: "ಕಾಲುವೆ ನೀರು, ಕೊಳವೆಬಾವಿ ಹಾಗೂ ಮಣ್ಣಿನ ತೇವಾಂಶ",
        moistureStatusLbl: "ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ತೇವಾಂಶ (Moisture Status)",
        growthStageLbl: "ಬೆಳೆಯ ಬೆಳವಣಿಗೆಯ ಹಂತ (Growth Stage)",
        irrigCalcBtn: "ನೀರಾವರಿ ಸಲಹೆ ಪಡೆಯಿರಿ (Get Advice) 💧",
        npkTitle: "ರಸಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್ (NPK)",
        npkDesc: "ಯೂರಿಯಾ, ಡಿಎಪಿ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ನಿಖರ ಪ್ರಮಾಣ",
        npkAreaLbl: "ವಿಸ್ತೀರ್ಣ (Area)",
        npkUnitLbl: "ಪ್ರಮಾಣ (Unit)",
        npkCropLbl: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
        npkCalcBtn: "ಗೊಬ್ಬರದ ಚೀಲಗಳನ್ನು ಲೆಕ್ಕಹಾಕಿ ⚡",
        mandiHeaderTitle: "ದಾವಣಗೆರೆ APMC ಮಾರುಕಟ್ಟೆ ದರಗಳು",
        mandiHeaderDesc: "ದಾವಣಗೆರೆ, ಚನ್ನಗಿರಿ, ಹರಿಹರ ಎಪಿಎಂಸಿ ದರಗಳು",
        mandiSearchPlaceholder: "ಬೆಳೆ ಹುಡುಕಿ (ಉದಾ: ಮೆಕ್ಕೆಜೋಳ, ಅಡಿಕೆ, ಹತ್ತಿ, ಭತ್ತ)...",
        thCrop: "ಬೆಳೆ (Crop)",
        thMandi: "ಮಾರುಕಟ್ಟೆ",
        thModal: "ಮಾದರಿ ದರ",
        thTrend: "ಟ್ರೆಂಡ್",
        weatherPrecTitle: "ದಾವಣಗೆರೆ 5 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ & ಸಲಹೆ",
        schemesHeaderTitle: "ಪ್ರಮುಖ ರೈತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        schemesHeaderDesc: "ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ & ಕೇಂದ್ರ ಕೃಷಿ ಪೋರ್ಟಲ್",
        navHome: "ಮುಖಪುಟ",
        navCrops: "ಬೆಳೆಗಳು",
        navDoctor: "ವೈದ್ಯ",
        navIrrig: "ನೀರಾವರಿ",
        navMandi: "ಮಾರುಕಟ್ಟೆ",
        navSchemes: "ಯೋಜನೆಗಳು",
        speechGreeting: "ನಮಸ್ಕಾರ! ಅಗ್ರಿಬಾಟ್ ದಾವಣಗೆರೆ ಸ್ಮಾರ್ಟ್ ರೈತ ಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ. ಇಂದಿನ ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮೆಕ್ಕೆಜೋಳ ಮತ್ತು ಅಡಿಕೆ ದರಗಳು ಉತ್ತಮವಾಗಿವೆ."
    },
    hi: {
        tagline: "एग्रीबॉट · दावणगेरे स्मार्ट किसान मित्र",
        ticker: "दावणगेरे मौसम: आज मौसम साफ रहेगा, हल्की सिंचाई कर सकते हैं।",
        location: "दावणगेरे, कर्नाटक (Davangere, KA)",
        weatherStatus: "धूप / Clear Sunny",
        humidity: "नमी (Humidity)",
        wind: "हवा (Wind)",
        rain: "बारिश (Rain)",
        quickServices: "दावणगेरे प्रमुख सेवाएं (Services)",
        cropSelectTitle: "फसल चयन",
        cropSelectDesc: "मक्का, सुपारी, धान",
        doctorTitle: "पौधा डॉक्टर",
        doctorDesc: "सुपारी सड़न व मक्का इल्ली",
        irrigTitle: "सिंचाई व NPK",
        irrigDesc: "यूरिया व नहर पानी ಲೆಕ್ಕ",
        mandiTitle: "दावणगेरे भाव",
        mandiDesc: "मक्का व सुपारी रेट",
        liveMandi: "दावणगेरे APMC मुख्य भाव (प्रति क्विंटल)",
        viewAll: "View All →",
        helplineTag: "दावणगेरे कृषि विज्ञान केंद्र (KVK)",
        helplineTitle: "किसान हेल्पलाइन (24x7)",
        helplineDesc: "टोल-फ्री नंबर: 1551",
        cropFilterTitle: "दावणगेरे फसल चयन इंजन",
        cropFilterDesc: "मिट्टी, भद्रा सिंचाई व मौसम अनुसार",
        soilSelectLbl: "1. मिट्टी का प्रकार (Soil Type)",
        seasonSelectLbl: "2. बुवाई का मौसम (Season)",
        waterSelectLbl: "3. पानी की उपलब्धता (Water Availability)",
        findCropsBtn: "सर्वश्रेष्ठ फसलें खोजें (Find Crops) ✨",
        scannerTitle: "AI पौधा रोग स्कैनर",
        scannerDesc: "कैमरे से पत्ते का फोटो स्कैन करें",
        scanPrompt: "कैमरे से फोटो लें",
        scanSub: "(टैप करें - AI तुरंत बीमारी और दवा बताएगा)",
        scanningActive: "AI पत्ता विश्लेषण जारी है...",
        symptomTitle: "दावणगेरे मुख्य फसलों की रोग जांच",
        docCropLbl: "फसल का प्रकार (Select Crop)",
        docSymptomLbl: "फसल में क्या लक्षण दिख रहे हैं?",
        diagnoseBtn: "बीमारी पहचानें व सटीक दवा देखें 🔍",
        irrigCardTitle: "दावणगेरे भद्रा सिंचाई प्रबंधन",
        irrigCardDesc: "नहर पानी, ट्यूबवेल व मिट्टी की नमी",
        moistureStatusLbl: "वर्तमान मिट्टी में नमी (Moisture Status)",
        growthStageLbl: "फसल की विकास अवस्था (Growth Stage)",
        irrigCalcBtn: "सिंचाई परामर्श प्राप्त करें (Get Advice) 💧",
        npkTitle: "उर्वरक व खाद कैलकुलेटर (NPK)",
        npkDesc: "यूरिया, डीएपी और पोटाश की सही मात्रा जानें",
        npkAreaLbl: "रकबा (Area)",
        npkUnitLbl: "इकाई (Unit)",
        npkCropLbl: "फसल चुनें",
        npkCalcBtn: "खाद की बोरियां निकालें ⚡",
        mandiHeaderTitle: "दावणगेरे APMC दैनिक मंडी भाव",
        mandiHeaderDesc: "दावणगेरे, चन्नगिरि, हरिहर बाजार दरें",
        mandiSearchPlaceholder: "फसल खोजें (उदा. मक्का, सुपारी, कपास, धान)...",
        thCrop: "फसल (Crop)",
        thMandi: "मंडी",
        thModal: "मॉडल भाव",
        thTrend: "ट्रेंड",
        weatherPrecTitle: "दावणगेरे 5-दिवसीय मौसम पूर्वानुमान व सलाह",
        schemesHeaderTitle: "प्रमुख किसान सरकारी योजनाएं",
        schemesHeaderDesc: "कर्नाटक रैता सिरी व केंद्र कृषि पोर्टल",
        navHome: "होम",
        navCrops: "फसल",
        navDoctor: "डॉक्टर",
        navIrrig: "सिंचाई",
        navMandi: "मंडी",
        navSchemes: "योजनाएं",
        speechGreeting: "नमस्कार! एग्रीबॉट दावणगेरे किसान मित्र में आपका स्वागत है। आज दावणगेरे एपीएमसी में मक्का और सुपारी के भाव स्थिर हैं।"
    },
    en: {
        tagline: "AgriBot · Davangere Smart Agriculture",
        ticker: "Davangere Weather: Clear sunny skies today, irrigation recommended.",
        location: "Davangere, Karnataka (DVG)",
        weatherStatus: "Clear Sunny",
        humidity: "Humidity",
        wind: "Wind",
        rain: "Rain",
        quickServices: "Davangere Services",
        cropSelectTitle: "Crop Advisor",
        cropSelectDesc: "Maize, Arecanut, Paddy",
        doctorTitle: "Plant Doctor",
        doctorDesc: "Fruit rot & Armyworm",
        irrigTitle: "Irrigation & NPK",
        irrigDesc: "Bhadra water & fertilizers",
        mandiTitle: "Davangere Mandi",
        mandiDesc: "Maize & Arecanut rates",
        liveMandi: "Davangere APMC Benchmark Rates (/Q)",
        viewAll: "View All →",
        helplineTag: "Davangere KVK Centre",
        helplineTitle: "Farmer Helpline (24x7)",
        helplineDesc: "Toll-Free Number: Dial 1551",
        cropFilterTitle: "Davangere Crop Selection Engine",
        cropFilterDesc: "By soil type, Bhadra canal & season",
        soilSelectLbl: "1. Soil Type",
        seasonSelectLbl: "2. Sowing Season",
        waterSelectLbl: "3. Water Availability",
        findCropsBtn: "Find Best Crops ✨",
        scannerTitle: "AI Plant Doctor",
        scannerDesc: "Scan leaf photo via camera",
        scanPrompt: "Capture photo via camera",
        scanSub: "(Tap to scan - AI detects disease and medicine instantly)",
        scanningActive: "AI leaf pathology analysis in progress...",
        symptomTitle: "Davangere Crops Symptom Diagnostic Check",
        docCropLbl: "Select Crop",
        docSymptomLbl: "What symptoms are visible on your plant?",
        diagnoseBtn: "Diagnose Disease & View Dosage 🔍",
        irrigCardTitle: "Davangere Bhadra Water Management",
        irrigCardDesc: "Canal water, borewell & soil moisture",
        moistureStatusLbl: "Current Soil Moisture Status",
        growthStageLbl: "Crop Growth Stage",
        irrigCalcBtn: "Get Irrigation Advice 💧",
        npkTitle: "NPK Fertilizer Dosage Calculator",
        npkDesc: "Calculate exact bags of Urea, DAP & Potash",
        npkAreaLbl: "Farm Area",
        npkUnitLbl: "Unit",
        npkCropLbl: "Select Crop",
        npkCalcBtn: "Calculate Fertilizer Bags ⚡",
        mandiHeaderTitle: "Davangere APMC Mandi Benchmark Rates",
        mandiHeaderDesc: "Davangere, Channagiri, Harihara market rates",
        mandiSearchPlaceholder: "Search crop (e.g. Maize, Arecanut, Cotton, Paddy)...",
        thCrop: "Crop",
        thMandi: "Mandi",
        thModal: "Modal Rate",
        thTrend: "Trend",
        weatherPrecTitle: "Davangere 5-Day Weather Forecast & Precautions",
        schemesHeaderTitle: "Key Farmer Welfare Schemes",
        schemesHeaderDesc: "Karnataka Raitha Siri & Central Portals",
        navHome: "Home",
        navCrops: "Crops",
        navDoctor: "Doctor",
        navIrrig: "Irrigation",
        navMandi: "Mandi",
        navSchemes: "Schemes",
        speechGreeting: "Welcome to AgriBot Davangere Smart Agriculture Assistant. Today's Davangere APMC market rates for Maize and Arecanut are strong and steady."
    }
};

// ================= DROPDOWN LOCALIZED OPTIONS =================
const SELECT_OPTIONS = {
    soil: {
        kn: [
            { val: "red", label: "ಕೆಂಪು ಮಣ್ಣು (Red Soil) - ಮೆಕ್ಕೆಜೋಳ, ರಾಗಿ, ಅಡಿಕೆ" },
            { val: "black", label: "ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (Black Soil) - ಹತ್ತಿ, ಕಡಲೆ, ಸೋಯಾಬೀನ್" },
            { val: "alluvial", label: "ಮೆಕ್ಕಲು ಮಣ್ಣು (Alluvial / Bhadra Basin) - ಭತ್ತ, ಕಬ್ಬು" },
            { val: "loamy", label: "ಗೋಡು ಮಣ್ಣು (Loamy Soil) - ತರಕಾರಿಗಳು, ಹೂವುಗಳು" },
            { val: "sandy", label: "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು (Sandy Loam) - ಕಡಲೆಕಾಯಿ" }
        ],
        hi: [
            { val: "red", label: "लाल मिट्टी (Red Soil) - मक्का, रागी, सुपारी" },
            { val: "black", label: "काली मिट्टी (Black Soil) - कपास, चना, सोयाबीन" },
            { val: "alluvial", label: "जलोढ़ / भद्रा बेसिन (Alluvial) - धान, गन्ना" },
            { val: "loamy", label: "दोमट मिट्टी (Loamy Soil) - सब्जियां" },
            { val: "sandy", label: "बलुई दोमट (Sandy Loam) - मूंगफली" }
        ],
        en: [
            { val: "red", label: "Red Soil - Maize, Ragi, Arecanut" },
            { val: "black", label: "Black Soil - Cotton, Bengal Gram, Soybean" },
            { val: "alluvial", label: "Alluvial / Bhadra Basin - Paddy, Sugarcane" },
            { val: "loamy", label: "Loamy Soil - Vegetables, Horticulture" },
            { val: "sandy", label: "Sandy Loam - Groundnut" }
        ]
    },
    season: {
        kn: [
            { val: "kharif", label: "ಮುಂಗಾರು / ಖಾರೀಫ್ (ಜೂನ್ - ಅಕ್ಟೋಬರ್ - ಮುಖ್ಯ ಬೆಳೆ)" },
            { val: "rabi", label: "ಹಿಂಗಾರು / ರಬಿ (ಅಕ್ಟೋಬರ್ - ಮಾರ್ಚ್)" },
            { val: "zaid", label: "ಬೇಸಿಗೆ / ಜಾಯಿದ್ (ಮಾರ್ಚ್ - ಜೂನ್)" }
        ],
        hi: [
            { val: "kharif", label: "खरीफ / मानसून (जून - अक्टूबर - मुख्य फसल)" },
            { val: "rabi", label: "रबी / सर्दी (अक्टूबर - मार्च)" },
            { val: "zaid", label: "जायद / गर्मी (मार्च - जून)" }
        ],
        en: [
            { val: "kharif", label: "Kharif / Monsoon (June - October - Main Crop)" },
            { val: "rabi", label: "Rabi / Winter (October - March)" },
            { val: "zaid", label: "Zaid / Summer (March - June)" }
        ]
    },
    water: {
        kn: [
            { val: "bhadra", label: "ಭದ್ರಾ ಕಾಲುವೆ ನೀರಾವರಿ (Bhadra Canal Command)" },
            { val: "borewell", label: "ಕೊಳವೆಬಾವಿ / ಬೋರ್‌ವೆಲ್ (Borewell Irrigated)" },
            { val: "rainfed", label: "ಮಳೆಯಾಶ್ರಿತ (ಜಗಳೂರು/ಹೊನ್ನಾಳಿ ಖುಷ್ಕಿ ಜಮೀನು)" }
        ],
        hi: [
            { val: "bhadra", label: "भद्रा नहर सिंचाई (Bhadra Canal Command)" },
            { val: "borewell", label: "ट्यूबवेल / बोरवेल सिंचाई (Borewell)" },
            { val: "rainfed", label: "वर्षा आधारित (Rainfed Dryland)" }
        ],
        en: [
            { val: "bhadra", label: "Bhadra Canal Command Area (Assured Irrigation)" },
            { val: "borewell", label: "Borewell / Groundwater Irrigated" },
            { val: "rainfed", label: "Rainfed Dryland (Jagalur/Honnali belts)" }
        ]
    },
    docCrops: {
        kn: [
            { val: "arecanut", label: "ಅಡಿಕೆ (Arecanut / ತೋಟಗಾರಿಕೆ)" },
            { val: "maize", label: "ಮೆಕ್ಕೆಜೋಳ (Maize / ದಾವಣಗೆರೆ ಬೆಳೆ)" },
            { val: "paddy", label: "ಭತ್ತ (Paddy - ಸೋನಾ ಮಸೂರಿ)" },
            { val: "cotton", label: "ಹತ್ತಿ (Cotton - ಬಿಳಿ ಬಂಗಾರ)" },
            { val: "groundnut", label: "ಕಡಲೆಕಾಯಿ / ಶೇಂಗಾ (Groundnut)" },
            { val: "ragi", label: "ರಾಗಿ (Finger Millet)" }
        ],
        hi: [
            { val: "arecanut", label: "सुपारी (Arecanut)" },
            { val: "maize", label: "मक्का (Maize)" },
            { val: "paddy", label: "धान (Paddy Sona Masuri)" },
            { val: "cotton", label: "कपास (Cotton)" },
            { val: "groundnut", label: "मूंगफली (Groundnut)" },
            { val: "ragi", label: "रागी (Finger Millet)" }
        ],
        en: [
            { val: "arecanut", label: "Arecanut (Betel nut)" },
            { val: "maize", label: "Maize (Corn)" },
            { val: "paddy", label: "Paddy (Rice - Sona Masuri)" },
            { val: "cotton", label: "Cotton" },
            { val: "groundnut", label: "Groundnut" },
            { val: "ragi", label: "Ragi (Finger Millet)" }
        ]
    },
    docSymptoms: {
        kn: [
            { val: "kole_roga", label: "ಅಡಿಕೆ ಕಾಯಿ ಉದುರುವುದು / ಕೊಳೆ ರೋಗ (Kole Roga / Fruit Rot)" },
            { val: "armyworm", label: "ಮೆಕ್ಕೆಜೋಳ ಸುಳಿಯಲ್ಲಿ ಲದ್ದಿ ಹುಳು (Fall Armyworm)" },
            { val: "paddy_blast", label: "ಭತ್ತದ ಎಲೆ ಬೆಂಕಿ ರೋಗ / ಕಂದು ಚುಕ್ಕೆ (Paddy Blast)" },
            { val: "bollworm", label: "ಹತ್ತಿ ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು (Bollworm)" },
            { val: "yellowing", label: "ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು / ಪೋಷಕಾಂಶ ಕೊರತೆ" }
        ],
        hi: [
            { val: "kole_roga", label: "सुपारी फल सड़न / कोळे रोग (Areca Kole Roga)" },
            { val: "armyworm", label: "मक्का सैनिक कीट / फॉल आर्मीवर्म (Armyworm)" },
            { val: "paddy_blast", label: "धान झुलसा / ब्लास्ट रोग (Paddy Blast)" },
            { val: "bollworm", label: "कपास गुलाबी सुंडी / बॉलवर्म (Bollworm)" },
            { val: "yellowing", label: "पत्ती पीलापन / पोषक तत्व कमी (Yellowing)" }
        ],
        en: [
            { val: "kole_roga", label: "Arecanut Fruit Rot / Nut Dropping (Kole Roga)" },
            { val: "armyworm", label: "Maize Fall Armyworm inside whorl" },
            { val: "paddy_blast", label: "Paddy Leaf Blast / Brown Spot" },
            { val: "bollworm", label: "Cotton Bollworm / Caterpillars" },
            { val: "yellowing", label: "Leaf Yellowing / Nutrient Deficiency" }
        ]
    },
    irrigMoisture: {
        kn: [
            { val: "dry", label: "ಒಣ ಮಣ್ಣು (ಕೈಯಲ್ಲಿ ಮುದ್ದೆ ಕಟ್ಟುವುದಿಲ್ಲ - ನೀರು ಬೇಕು)" },
            { val: "moist", label: "ತೇವಾಂಶಯುಕ್ತ ಮಣ್ಣು (ತಂಪಾಗಿದೆ, ತೇವಾಂಶ ಸಾಕಾಗಿದೆ)" },
            { val: "wet", label: "ಅತಿಯಾದ ತೇವಾಂಶ / ನೀರು ನಿಂತಿದೆ (ಕಾಲುವೆ ನೀರು ಜಾಸ್ತಿ)" }
        ],
        hi: [
            { val: "dry", label: "सूखी मिट्टी (ढेला नहीं बनता - पानी चाहिए)" },
            { val: "moist", label: "नम मिट्टी (पर्याप्त नमी है)" },
            { val: "wet", label: "अत्यधिक गीली / पानी भरा हुआ" }
        ],
        en: [
            { val: "dry", label: "Dry soil (crumbles easily - needs irrigation)" },
            { val: "moist", label: "Moist soil (optimal moisture present)" },
            { val: "wet", label: "Waterlogged (standing canal water present)" }
        ]
    },
    irrigStage: {
        kn: [
            { val: "germination", label: "ಮೊಳಕೆಯೊಡೆಯುವ ಹಂತ (Germination)" },
            { val: "vegetative", label: "ಬೆಳವಣಿಗೆಯ ಹಂತ (Vegetative Growth)" },
            { val: "flowering", label: "ಹೂವಾಡುವ / ತೆನೆ ಬರುವ ಹಂತ (Flowering - Critical!)" },
            { val: "maturity", label: "ಕಾಳು ತುಂಬುವ ಹಂತ (Grain / Nut Filling)" }
        ],
        hi: [
            { val: "germination", label: "अंकुरण अवस्था (Germination)" },
            { val: "vegetative", label: "वृद्धि अवस्था (Vegetative Growth)" },
            { val: "flowering", label: "फूल / दाना आने की क्रांतिक अवस्था (Critical)" },
            { val: "maturity", label: "दाना भरने की अवस्था (Maturity)" }
        ],
        en: [
            { val: "germination", label: "Initial / Germination Stage" },
            { val: "vegetative", label: "Vegetative Growth Stage" },
            { val: "flowering", label: "Flowering / Tassel Stage (Critical!)" },
            { val: "maturity", label: "Grain / Nut Filling Stage" }
        ]
    },
    npkCrops: {
        kn: [
            { val: "maize", label: "ಮೆಕ್ಕೆಜೋಳ (Maize - ದಾವಣಗೆರೆ)" },
            { val: "arecanut", label: "ಅಡಿಕೆ (Arecanut - ಚನ್ನಗಿರಿ)" },
            { val: "paddy", label: "ಭತ್ತ (Paddy - ಭದ್ರಾ ಪ್ರದೇಶ)" },
            { val: "cotton", label: "ಹತ್ತಿ (Cotton - ಹರಿಹರ)" },
            { val: "groundnut", label: "ಕಡಲೆಕಾಯಿ (Groundnut)" }
        ],
        hi: [
            { val: "maize", label: "मक्का (Maize - Davangere)" },
            { val: "arecanut", label: "सुपारी (Arecanut - Channagiri)" },
            { val: "paddy", label: "धान (Paddy - Bhadra)" },
            { val: "cotton", label: "कपास (Cotton - Harihara)" },
            { val: "groundnut", label: "मूंगफली (Groundnut)" }
        ],
        en: [
            { val: "maize", label: "Maize (Davangere Special)" },
            { val: "arecanut", label: "Arecanut (Channagiri Hub)" },
            { val: "paddy", label: "Paddy (Bhadra Canal Command)" },
            { val: "cotton", label: "Cotton (Harihara/Jagalur)" },
            { val: "groundnut", label: "Groundnut" }
        ]
    }
};

// ================= DAVANGERE CROP DATABASE =================
const CROP_DATABASE = [
    {
        id: "maize",
        nameKn: "ಮೆಕ್ಕೆಜೋಳ (Maize - ದಾವಣಗೆರೆ ಗೋಲ್ಡ್)",
        nameHi: "मक्का (Maize - दावणगेरे गोल्ड)",
        nameEn: "Maize (Corn - Davangere Special)",
        soils: ["red", "black", "alluvial", "loamy"],
        seasons: ["kharif", "rabi", "zaid"],
        water: ["bhadra", "borewell", "rainfed"],
        duration: "95 - 110 ದಿನ / Days",
        yield: "25 - 32 ಕ್ವಿಂಟಾಲ್/ಎಕರೆ",
        avgPrice: "₹2,380 - ₹2,480/ಕ್ವಿಂಟಾಲ್",
        tipsKn: "ದಾವಣಗೆರೆಯ ಮುಖ್ಯ ಬೆಳೆ! ಬಿತ್ತನೆಗೆ ಹೈಬ್ರಿಡ್ ಬೀಜ (CP 818 / Pioneer) ಬಳಸಿ. ಬಿತ್ತಿದ 20 ದಿನಗಳಲ್ಲಿ ಲದ್ದಿ ಹುಳು ಹತೋಟಿಗೆ ಎಮಾಮೆಕ್ಟಿನ್ ಸಿಂಪಡಿಸಿ.",
        tipsHi: "दावणगेरे की प्रमुख फसल! बुवाई के 20 दिन बाद फॉल आर्मीवर्म के लिए इमामेक्टिन स्प्रे करें।",
        tipsEn: "Davangere's flagship crop. Scout early for Fall armyworm and apply Emamectin Benzoate."
    },
    {
        id: "arecanut",
        nameKn: "ಅಡಿಕೆ (Arecanut - ಚನ್ನಗಿರಿ ರಾಶಿ ಇಡಿ)",
        nameHi: "सुपारी (Arecanut - चन्नगिरि)",
        nameEn: "Arecanut (Betel nut - Channagiri Rashi)",
        soils: ["red", "loamy", "alluvial"],
        seasons: ["kharif", "rabi", "zaid"],
        water: ["bhadra", "borewell"],
        duration: "ದೀರ್ಘಾವಧಿ ತೋಟ (Perennial)",
        yield: "12 - 16 ಕ್ವಿಂಟಾಲ್/ಎಕರೆ",
        avgPrice: "₹48,500 - ₹52,400/ಕ್ವಿಂಟಾಲ್",
        tipsKn: "ಚನ್ನಗಿರಿ ಪ್ರದೇಶದ ಬಂಗಾರದ ಬೆಳೆ! ಮುಂಗಾರು ಮಳೆಗೆ ಮುನ್ನ ಕೊಳೆ ರೋಗ ತಡೆಗೆ 1% ಬೋರ್ಡೋ ದ್ರಾವಣವನ್ನು ಗೊಂಚಲುಗಳಿಗೆ ಕಡ್ಡಾಯವಾಗಿ ಸಿಂಪಡಿಸಿ.",
        tipsHi: "चन्नगिरि की प्रमुख नकदी फसल! मानसून से पहले कोळे रोग रोकने हेतु 1% बोर्डो मिश्रण का स्प्रे करें।",
        tipsEn: "Premier cash crop of Channagiri/DVG. Spray 1% Bordeaux mixture on bunches before monsoon."
    },
    {
        id: "paddy",
        nameKn: "ಭತ್ತ (Paddy - ಭದ್ರಾ ಸೋನಾ ಮಸೂರಿ)",
        nameHi: "धान (Paddy Sona Masuri - भद्रा)",
        nameEn: "Paddy (Sona Masuri - Bhadra Basin)",
        soils: ["alluvial", "black", "loamy"],
        seasons: ["kharif", "zaid"],
        water: ["bhadra", "borewell"],
        duration: "125 - 135 ದಿನ / Days",
        yield: "25 - 30 ಕ್ವಿಂಟಾಲ್/ಎಕರೆ",
        avgPrice: "₹2,550 - ₹2,850/ಕ್ವಿಂಟಾಲ್",
        tipsKn: "ಭದ್ರಾ ಕಾಲುವೆ ಅಚ್ಚುಕಟ್ಟು ಪ್ರದೇಶಕ್ಕೆ (ಹರಿಹರ, ಹೊನ್ನಾಳಿ) ಅತಿ ಸೂಕ್ತ. ತೆನೆ ಬರುವಾಗ ಜಮೀನಿನಲ್ಲಿ 2-3 ಸೆಂ.ಮೀ ನೀರು ನಿಲ್ಲಿಸಿ.",
        tipsHi: "भद्रा नहर क्षेत्र के लिए सर्वोत्तम। बाली निकलते समय 2-3 सेमी पानी बनाए रखें।",
        tipsEn: "Ideal for Bhadra canal command. Maintain 2-3cm standing water during panicle stage."
    },
    {
        id: "cotton",
        nameKn: "ಹತ್ತಿ (Cotton - ಬಿಳಿ ಬಂಗಾರ)",
        nameHi: "कपास (Cotton - व्हाइट गोल्ड)",
        nameEn: "Cotton (Davangere Cotton)",
        soils: ["black", "red"],
        seasons: ["kharif"],
        water: ["bhadra", "borewell", "rainfed"],
        duration: "150 - 170 ದಿನ / Days",
        yield: "10 - 15 ಕ್ವಿಂಟಾಲ್/ಎಕರೆ",
        avgPrice: "₹7,450 - ₹7,850/ಕ್ವಿಂಟಾಲ್",
        tipsKn: "ದಾವಣಗೆರೆ/ಜಗಳೂರು ಕಪ್ಪು ಮಣ್ಣಿಗೆ ಬೆಸ್ಟ್. ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ ನಿಯಂತ್ರಣಕ್ಕೆ ಎಕರೆಗೆ 5 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಕಟ್ಟಿ.",
        tipsHi: "काली मिट्टी के लिए सर्वोत्तम। गुलाबी सुंडी रोकने के लिए फेरोमोन ट्रैप लगाएं।",
        tipsEn: "Best suited for black cotton soils. Install pheromone traps for pink bollworm control."
    },
    {
        id: "groundnut",
        nameKn: "ಕಡಲೆಕಾಯಿ / ಶೇಂಗಾ (Groundnut)",
        nameHi: "मूंगफली (Groundnut)",
        nameEn: "Groundnut",
        soils: ["red", "sandy", "loamy"],
        seasons: ["kharif", "zaid"],
        water: ["borewell", "rainfed"],
        duration: "100 - 115 ದಿನ / Days",
        yield: "10 - 14 ಕ್ವಿಂಟಾಲ್/ಎಕರೆ",
        avgPrice: "₹6,400 - ₹6,900/ಕ್ವಿಂಟಾಲ್",
        tipsKn: "ಜಗಳೂರು ಖುಷ್ಕಿ ಜಮೀನಿಗೆ ಸೂಕ್ತ. ಹೂವಾಡುವಾಗ ಜಿಪ್ಸಮ್ 200 ಕೆಜಿ/ಎಕರೆ ಹಾಕಿದರೆ ಕಾಯಿ ದಪ್ಪನಾಗಿ ಎಣ್ಣೆ ಅಂಶ ಹೆಚ್ಚುತ್ತದೆ.",
        tipsHi: "फूल आते समय 200 किग्रा जिप्सम डालें, जिससे फलियां मोटी बनती हैं।",
        tipsEn: "Apply 200kg Gypsum/acre at flowering stage for bold kernels and high oil content."
    }
];

// ================= DISEASE & PEST DATABASE =================
const DISEASE_DATABASE = {
    kole_roga: {
        nameKn: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ / ಮಹಾಳಿ ರೋಗ (Areca Fruit Rot / Kole Roga)",
        nameHi: "सुपारी कोळे रोग / फल सड़न (Arecanut Kole Roga)",
        nameEn: "Arecanut Fruit Rot (Kole Roga / Mahali)",
        severityKn: "ಗಂಭೀರ (Critical Alert)",
        severityHi: "गंभीर (Critical Alert)",
        severityEn: "Critical Alert",
        organicKn: "ಅಡಿಕೆ ಗೊಂಚಲುಗಳಿಗೆ ಪಾಲಿಥಿನ್ ಚೀಲ ಕಟ್ಟುವುದು (Covering bunches). ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಲೇಪನ.",
        organicHi: "सुपारी के गुच्छों को प्लास्टिक कवर से ढकें। बोर्डो पेस्ट लगाएं।",
        organicEn: "Cover areca bunches with polythene sheets. Apply Bordeaux paste.",
        chemicalKn: "1% ಬೋರ್ಡೋ ದ್ರಾವಣವನ್ನು (1kg ಸುಣ್ಣ + 1kg ಮೈಲುತುತ್ತ + 100 ಲೀಟರ್ ನೀರು) ಅಥವಾ ಮ್ಯಾಂಕೋಜೆಬ್ 3 ಗ್ರಾಂ/ಲೀಟರ್ ಮಳೆಗೆ ಮುನ್ನ ಸಿಂಪಡಿಸಿ.",
        chemicalHi: "1% बोर्डो मिश्रण (1kg चूना + 1kg नीला थोथा + 100L पानी) या मैंकोजेब 3 ग्राम/लीटर का छिड़काव करें।",
        chemicalEn: "Spray 1% freshly prepared Bordeaux mixture (1kg Copper Sulphate + 1kg Quicklime + 100L water) or Mancozeb 3g/L.",
        preventionKn: "ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿಗಾಲುವೆಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ. ಉದುರಿದ ಕೊಳೆತ ಕಾಯಿಗಳನ್ನು ಆಯ್ದು ಸುಟ್ಟುಹಾಕಿ.",
        preventionHi: "बगीचे में जल निकासी रखें और गिरे हुए सड़े फल इकट्ठा कर नष्ट करें।",
        preventionEn: "Ensure deep drainage trenches in garden and destroy fallen diseased nuts."
    },
    armyworm: {
        nameKn: "ಮೆಕ್ಕೆಜೋಳದ ಲದ್ದಿ ಹುಳು (Fall Armyworm in Maize)",
        nameHi: "मक्का का फॉल आर्मीवर्म / सैनिक कीट (Fall Armyworm)",
        nameEn: "Maize Fall Armyworm (Spodoptera frugiperda)",
        severityKn: "ಹೆಚ್ಚು (High Alert)",
        severityHi: "उच्च (High Alert)",
        severityEn: "High Alert",
        organicKn: "ಬೇವಿನ ಕಷಾಯ 5ml/ಲೀಟರ್. ಸುಳಿಯೊಳಗೆ ಮರಳು ಅಥವಾ ಬೂದಿ ಹಾಕುವುದು.",
        organicHi: "नीम तेल 5ml/लीटर। मक्का की गोभ में रेत या राख डालें।",
        organicEn: "Apply cold-pressed Neem oil (5ml/L). Dust dry sand or ash into the leaf whorl.",
        chemicalKn: "ಎಮಾಮೆಕ್ಟಿನ್ ಬೆಂಜೋಯೇಟ್ 5% SG @ 0.5 ಗ್ರಾಂ/ಲೀಟರ್ ಅಥವಾ ಕೊರಾಜೆನ್ 0.4 ಮಿಲಿ/ಲೀಟರ್ ಅನ್ನು ಸುಳಿಗೆ ತಲುಪುವಂತೆ ಸಿಂಪಡಿಸಿ.",
        chemicalHi: "इमामेक्टिन बेंजोएट 5% SG @ 0.5 ग्राम/लीटर या कोराजन 0.4ml/लीटर गोभ में स्प्रे करें।",
        chemicalEn: "Directly spray into the central whorl with Emamectin Benzoate 5% SG @ 0.5g/L or Coragen @ 0.4ml/L.",
        preventionKn: "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಎಕರೆಗೆ 5 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಕಟ್ಟಿ.",
        preventionHi: "बुवाई से पहले बीज उपचार करें और फेरोमोन ट्रैप लगाएं।",
        preventionEn: "Perform seed treatment and set up 5 pheromone traps per acre."
    },
    paddy_blast: {
        nameKn: "ಭತ್ತದ ಎಲೆ ಬೆಂಕಿ ರೋಗ / ಕಂದು ಚುಕ್ಕೆ (Paddy Blast)",
        nameHi: "धान का ब्लास्ट / झुलसा रोग (Paddy Blast)",
        nameEn: "Paddy Leaf Blast (Magnaporthe oryzae)",
        severityKn: "ಮಧ್ಯಮ (Medium)",
        severityHi: "मध्यम (Medium)",
        severityEn: "Medium Severity",
        organicKn: "10% ಹಸುವಿನ ಗಂಜಲ ಸಿಂಪಡಿಸಿ. ಸಾರಜನಕ ಗೊಬ್ಬರ ಕಡಿಮೆ ಮಾಡಿ.",
        organicHi: "10% गोमूत्र का छिड़काव करें। यूरिया का अधिक उपयोग बंद करें।",
        organicEn: "Spray 10% cow urine extract. Avoid excess split doses of urea.",
        chemicalKn: "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75% WP (Baan) @ 0.6 ಗ್ರಾಂ/ಲೀಟರ್ ಅಥವಾ ಇಸಾಪ್ರೋಥಿಯೋಲೇನ್ (Kitazin) 1.5 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        chemicalHi: "ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम/लीटर या किटाजिन 1.5ml/लीटर पानी में स्प्रे करें।",
        chemicalEn: "Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane @ 1.5ml/L at disease onset.",
        preventionKn: "ಬೆಂಕಿ ರೋಗ ನಿರೋಧಕ ಭತ್ತದ ತಳಿಗಳನ್ನು (ಆರ್.ಪಿ. ಬಯೋ 226) ಬಿತ್ತಿ.",
        preventionHi: "ब्लास्ट प्रतिरोधी बीज किस्मों का चयन करें।",
        preventionEn: "Use certified blast-resistant seed varieties and avoid prolonged dry spells in paddy."
    },
    bollworm: {
        nameKn: "ಹತ್ತಿ ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ (Pink Bollworm)",
        nameHi: "कपास की गुलाबी सुंडी (Pink Bollworm)",
        nameEn: "Cotton Pink Bollworm",
        severityKn: "ಹೆಚ್ಚು (High Alert)",
        severityHi: "उच्च (High Alert)",
        severityEn: "High Alert",
        organicKn: "ಎಕರೆಗೆ 8 ಮೋಹಕ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಬೇವಿನ ಎಣ್ಣೆ 5ml/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        organicHi: "खेत में 8 फेरोमोन ट्रैप लगाएं। नीम तेल 5ml/लीटर स्प्रे करें।",
        organicEn: "Install 8 pheromone traps per acre. Spray 5% Neem seed kernel extract.",
        chemicalKn: "ಪ್ರೊಫೆನೋಫಾಸ್ 50% EC @ 2 ಮಿಲಿ/ಲೀಟರ್ ಅಥವಾ ಡೆಲ್ಟಾಮೆಥ್ರಿನ್ 1 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        chemicalHi: "प्रोफेनोफॉस 50% EC @ 2ml/लीटर पानी में घोलकर छिड़कें।",
        chemicalEn: "Spray Profenofos 50% EC @ 2ml/L or Spinosad 45% SC @ 0.3ml/L.",
        preventionKn: "ಹತ್ತಿ ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ನಿಯಮಿತವಾಗಿ ಕಾಯಿಗಳನ್ನು ಒಡೆದು ಹುಳು ಪರೀಕ್ಷಿಸಿ.",
        preventionHi: "फूल व गूलर अवस्था पर नियमित निगरानी रखें।",
        preventionEn: "Regularly dissect green bolls to detect early larvae entrance."
    },
    yellowing: {
        nameKn: "ಎಲೆಗಳ ಹಳದಿ ರೋಗ / ಪೋಷಕಾಂಶ ಕೊರತೆ (Yellowing / Chlorosis)",
        nameHi: "पत्ती पीलापन / सूक्ष्म पोषक कमी (Yellowing)",
        nameEn: "Leaf Chlorosis / Nutrient Deficiency",
        severityKn: "ಕಡಿಮೆ (Low)",
        severityHi: "कम (Low)",
        severityEn: "Low to Medium",
        organicKn: "ಜೀವಾಮೃತ 200 ಲೀಟರ್/ಎಕರೆ ಕಾಲುವೆ ನೀರಿನೊಂದಿಗೆ ಹಾಯಿಸಿ.",
        organicHi: "जीवामृत 200 लीटर प्रति एकड़ सिंचाई पानी के साथ दें।",
        organicEn: "Apply 200L Jeevamrut per acre with Bhadra irrigation water.",
        chemicalKn: "19:19:19 NPK 5 ಗ್ರಾಂ/ಲೀಟರ್ + ಲಘು ಪೋಷಕಾಂಶ (Zinc & Boron) 2 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        chemicalHi: "19:19:19 NPK 5 ग्राम/लीटर + जिंक सल्फेट 2 ग्राम/लीटर स्प्रे करें।",
        chemicalEn: "Foliar spray with 19:19:19 NPK @ 5g/L + Chelated Micronutrients @ 2g/L.",
        preventionKn: "ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ, ಸುಣ್ಣ ಅಥವಾ ಜಿಪ್ಸಮ್ ಅಗತ್ಯಕ್ಕನುಗುಣವಾಗಿ ಬಳಸಿ.",
        preventionHi: "मिट्टी परीक्षण कराएं और संतुलित उर्वरक डालें।",
        preventionEn: "Conduct soil testing and apply gypsum or lime based on soil pH."
    }
};

// ================= DAVANGERE & KARNATAKA APMC MANDI DATA =================
const MANDI_DATA = [
    { cropKn: "ಮೆಕ್ಕೆಜೋಳ (Maize)", cropHi: "मक्का (Maize)", cropEn: "Maize (Corn)", mandiKn: "ದಾವಣಗೆರೆ APMC (Davangere)", mandiHi: "दावणगेरे APMC", mandiEn: "Davangere APMC", modal: "₹2,420", range: "₹2,350 - ₹2,480", trend: "+₹35", up: true },
    { cropKn: "ಅಡಿಕೆ (Arecanut ರಾಶಿ)", cropHi: "सुपारी (Arecanut Rashi)", cropEn: "Arecanut (Rashi Idi)", mandiKn: "ಚನ್ನಗಿರಿ APMC (Channagiri)", mandiHi: "चन्नगिरि APMC", mandiEn: "Channagiri APMC", modal: "₹51,800", range: "₹48,500 - ₹52,400", trend: "+₹450", up: true },
    { cropKn: "ಭತ್ತ (Paddy ಸೋನಾ ಮಸೂರಿ)", cropHi: "धान (Paddy Sona Masuri)", cropEn: "Paddy (Sona Masuri)", mandiKn: "ಹರಿಹರ APMC (Harihara)", mandiHi: "हरिहर APMC", mandiEn: "Harihara APMC", modal: "₹2,680", range: "₹2,450 - ₹2,850", trend: "+₹40", up: true },
    { cropKn: "ಹತ್ತಿ (Cotton DCH-32)", cropHi: "कपास (Cotton)", cropEn: "Cotton (DCH-32)", mandiKn: "ದಾವಣಗೆರೆ APMC", mandiHi: "दावणगेरे APMC", mandiEn: "Davangere APMC", modal: "₹7,650", range: "₹7,450 - ₹7,850", trend: "-₹30", up: false },
    { cropKn: "ಕಡಲೆಕಾಯಿ (Groundnut)", cropHi: "मूंगफली (Groundnut)", cropEn: "Groundnut", mandiKn: "ಜಗಳೂರು (Jagalur APMC)", mandiHi: "जगलूर APMC", mandiEn: "Jagalur APMC", modal: "₹6,750", range: "₹6,400 - ₹6,900", trend: "+₹60", up: true },
    { cropKn: "ರಾಗಿ (Ragi)", cropHi: "रागी (Ragi)", cropEn: "Ragi (Finger Millet)", mandiKn: "ದಾವಣಗೆರೆ ಮುಖ್ಯ ಮಾರುಕಟ್ಟೆ", mandiHi: "दावणगेरे मंडी", mandiEn: "Davangere Market", modal: "₹3,650", range: "₹3,400 - ₹3,850", trend: "+₹50", up: true },
    { cropKn: "ಈರುಳ್ಳಿ (Onion Red)", cropHi: "प्याज (Onion Red)", cropEn: "Onion (Red)", mandiKn: "ದಾವಣಗೆರೆ ತರಕಾರಿ ಮಾರುಕಟ್ಟೆ", mandiHi: "दावणगेरे मंडी", mandiEn: "Davangere APMC", modal: "₹2,250", range: "₹1,800 - ₹2,600", trend: "+₹120", up: true },
    { cropKn: "ಕಡಲೆ (Bengal Gram)", cropHi: "चना (Bengal Gram)", cropEn: "Chickpea (Chana)", mandiKn: "ಹೊನ್ನಾಳಿ APMC (Honnali)", mandiHi: "होन्नाली APMC", mandiEn: "Honnali APMC", modal: "₹5,950", range: "₹5,750 - ₹6,150", trend: "+₹25", up: true }
];

// ================= LANGUAGE CONTROLS =================
function openLanguageModal() {
    playBeep(450, 0.08);
    document.getElementById('language-modal').classList.remove('hidden');
}

function closeLanguageModal() {
    document.getElementById('language-modal').classList.add('hidden');
}

function setLanguage(lang) {
    state.lang = lang;
    playBeep(650, 0.1);

    ['kn', 'hi', 'en'].forEach(l => {
        const check = document.getElementById(`check-${l}`);
        if (check) {
            if (l === lang) check.classList.remove('hidden');
            else check.classList.add('hidden');
        }
    });

    const langNames = { kn: "ಕನ್ನಡ", hi: "हिंदी", en: "English" };
    document.getElementById('lang-indicator').textContent = langNames[lang];

    updateUIForLanguage();
    closeLanguageModal();
}

// ================= FARM PROFILE CONTROLS =================
function openFarmModal() {
    playBeep(450, 0.08);
    const p = state.farmProfile;
    document.getElementById('prof-name').value = p.name;
    document.getElementById('prof-taluk').value = p.taluk;
    document.getElementById('prof-acres').value = p.acres;
    document.getElementById('prof-source').value = p.source;
    document.getElementById('farm-modal').classList.remove('hidden');
}

function closeFarmModal() {
    document.getElementById('farm-modal').classList.add('hidden');
}

function saveFarmProfile() {
    playBeep(750, 0.12);
    const name = document.getElementById('prof-name').value.trim() || "ಬಸವರಾಜ್";
    const taluk = document.getElementById('prof-taluk').value;
    const acres = parseFloat(document.getElementById('prof-acres').value) || 2.5;
    const source = document.getElementById('prof-source').value;

    state.farmProfile = { name, taluk, acres, source };

    try {
        localStorage.setItem('agribot_dvg_profile', JSON.stringify(state.farmProfile));
    } catch (e) {}

    updateProfileGreeting();
    closeFarmModal();
}

function updateProfileGreeting() {
    const p = state.farmProfile;
    const l = state.lang;
    const talukNamesKn = {
        dvg_rural: "ದಾವಣಗೆರೆ ಗ್ರಾಮೀಣ",
        harihara: "ಹರಿಹರ",
        channagiri: "ಚನ್ನಗಿರಿ",
        honnali: "ಹೊನ್ನಾಳಿ",
        jagalur: "ಜಗಳೂರು",
        nyamati: "ನ್ಯಾಮತಿ"
    };

    const waterNamesKn = {
        bhadra: "ಭದ್ರಾ ಕಾಲುವೆ",
        borewell: "ಕೊಳವೆಬಾವಿ",
        rainfed: "ಮಳೆಯಾಶ್ರಿತ"
    };

    if (l === 'kn') {
        document.getElementById('greet-farmer-name').textContent = `ನಮಸ್ಕಾರ, ${p.name}!`;
        document.getElementById('greet-farm-details').textContent = `${talukNamesKn[p.taluk] || "ದಾವಣಗೆರೆ"} • ${p.acres} ಎಕರೆ • ${waterNamesKn[p.source] || "ಭದ್ರಾ ಕಾಲುವೆ"}`;
    } else if (l === 'hi') {
        document.getElementById('greet-farmer-name').textContent = `नमस्ते, ${p.name}!`;
        document.getElementById('greet-farm-details').textContent = `दावणगेरे • ${p.acres} एकड़ • भद्रा सिंचाई`;
    } else {
        document.getElementById('greet-farmer-name').textContent = `Welcome, Farmer ${p.name}!`;
        document.getElementById('greet-farm-details').textContent = `Davangere • ${p.acres} Acres • Bhadra Irrigation`;
    }
}

// ================= UI LOCALIZATION UPDATER =================
function updateUIForLanguage() {
    const l = state.lang;
    const t = i18n[l];

    document.getElementById('app-tagline').textContent = t.tagline;
    document.getElementById('advisory-ticker').textContent = t.ticker;
    document.getElementById('home-loc').textContent = t.location;
    document.getElementById('weather-status').innerHTML = `<span>☀️</span><span>${t.weatherStatus}</span>`;

    document.getElementById('lbl-humidity').textContent = t.humidity;
    document.getElementById('lbl-wind').textContent = t.wind;
    document.getElementById('lbl-rain').textContent = t.rain;

    document.getElementById('lbl-quick-services').textContent = t.quickServices;
    document.getElementById('btn-crop-select-title').textContent = t.cropSelectTitle;
    document.getElementById('btn-crop-select-desc').textContent = t.cropSelectDesc;
    document.getElementById('btn-doctor-title').textContent = t.doctorTitle;
    document.getElementById('btn-doctor-desc').textContent = t.doctorDesc;
    document.getElementById('btn-irrig-title').textContent = t.irrigTitle;
    document.getElementById('btn-irrig-desc').textContent = t.irrigDesc;
    document.getElementById('btn-mandi-title').textContent = t.mandiTitle;
    document.getElementById('btn-mandi-desc').textContent = t.mandiDesc;
    document.getElementById('lbl-live-mandi').querySelector('span').textContent = t.liveMandi;
    document.getElementById('btn-view-all-mandi').textContent = t.viewAll;

    document.getElementById('lbl-helpline-tag').textContent = t.helplineTag;
    document.getElementById('lbl-helpline-title').textContent = t.helplineTitle;
    document.getElementById('lbl-helpline-desc').textContent = t.helplineDesc;

    document.getElementById('crop-filter-title').textContent = t.cropFilterTitle;
    document.getElementById('crop-filter-desc').textContent = t.cropFilterDesc;
    document.getElementById('lbl-soil-select').textContent = t.soilSelectLbl;
    document.getElementById('lbl-season-select').textContent = t.seasonSelectLbl;
    document.getElementById('lbl-water-select').textContent = t.waterSelectLbl;
    document.getElementById('btn-find-crops').textContent = t.findCropsBtn;

    document.getElementById('lbl-scanner-title').textContent = t.scannerTitle;
    document.getElementById('lbl-scanner-desc').textContent = t.scannerDesc;
    document.getElementById('lbl-scan-prompt').textContent = t.scanPrompt;
    document.getElementById('lbl-scan-sub').textContent = t.scanSub;
    document.getElementById('lbl-scanning-active').textContent = t.scanningActive;
    document.getElementById('symptom-title').querySelector('span').textContent = t.symptomTitle;
    document.getElementById('lbl-doc-crop').textContent = t.docCropLbl;
    document.getElementById('lbl-doc-symptom').textContent = t.docSymptomLbl;
    document.getElementById('btn-diagnose').textContent = t.diagnoseBtn;

    document.getElementById('irrig-card-title').textContent = t.irrigCardTitle;
    document.getElementById('irrig-card-desc').textContent = t.irrigCardDesc;
    document.getElementById('lbl-moisture-status').textContent = t.moistureStatusLbl;
    document.getElementById('lbl-growth-stage').textContent = t.growthStageLbl;
    document.getElementById('btn-irrig-calc').textContent = t.irrigCalcBtn;
    document.getElementById('npk-title').textContent = t.npkTitle;
    document.getElementById('npk-desc').textContent = t.npkDesc;
    document.getElementById('lbl-npk-area').textContent = t.npkAreaLbl;
    document.getElementById('lbl-npk-unit').textContent = t.npkUnitLbl;
    document.getElementById('lbl-npk-crop').textContent = t.npkCropLbl;
    document.getElementById('btn-npk-calc').textContent = t.npkCalcBtn;

    document.getElementById('mandi-header-title').textContent = t.mandiHeaderTitle;
    document.getElementById('mandi-header-desc').textContent = t.mandiHeaderDesc;
    document.getElementById('mandi-search-input').placeholder = t.mandiSearchPlaceholder;
    document.getElementById('th-crop').textContent = t.thCrop;
    document.getElementById('th-mandi').textContent = t.thMandi;
    document.getElementById('th-modal').textContent = t.thModal;
    document.getElementById('th-trend').textContent = t.thTrend;
    document.getElementById('weather-prec-title').querySelector('span').textContent = t.weatherPrecTitle;

    document.getElementById('schemes-header-title').textContent = t.schemesHeaderTitle;
    document.getElementById('schemes-header-desc').textContent = t.schemesHeaderDesc;

    document.getElementById('nav-lbl-home').textContent = t.navHome;
    document.getElementById('nav-lbl-crops').textContent = t.navCrops;
    document.getElementById('nav-lbl-doctor').textContent = t.navDoctor;
    document.getElementById('nav-lbl-irrig').textContent = t.navIrrig;
    document.getElementById('nav-lbl-mandi').textContent = t.navMandi;
    document.getElementById('nav-lbl-schemes').textContent = t.navSchemes;

    populateLocalizedSelects();
    updateProfileGreeting();
    renderWeatherPrecautions();
    renderSchemes();
    calculateCropAdvice();
    renderMandiTable(MANDI_DATA);
}

// ================= POPULATE SELECT DROPDOWNS =================
function populateLocalizedSelects() {
    const l = state.lang;
    const fill = (id, options) => {
        const el = document.getElementById(id);
        if (!el) return;
        const currentVal = el.value;
        el.innerHTML = '';
        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            el.appendChild(o);
        });
        if (currentVal) el.value = currentVal;
    };

    fill('sel-soil', SELECT_OPTIONS.soil[l]);
    fill('sel-season', SELECT_OPTIONS.season[l]);
    fill('sel-water', SELECT_OPTIONS.water[l]);
    fill('doc-crop', SELECT_OPTIONS.docCrops[l]);
    fill('doc-symptom', SELECT_OPTIONS.docSymptoms[l]);
    fill('irrig-moisture', SELECT_OPTIONS.irrigMoisture[l]);
    fill('irrig-stage', SELECT_OPTIONS.irrigStage[l]);
    fill('npk-crop', SELECT_OPTIONS.npkCrops[l]);

    const unitEl = document.getElementById('npk-unit');
    if (unitEl) {
        if (l === 'kn') {
            unitEl.innerHTML = '<option value="acre">ಎಕರೆ (Acre)</option><option value="guntha">ಗುಂಟೆ (Guntha)</option><option value="hectare">ಹೆಕ್ಟೇರ್ (Hectare)</option>';
        } else if (l === 'hi') {
            unitEl.innerHTML = '<option value="acre">एकड़ (Acre)</option><option value="guntha">गुंठा (Guntha)</option><option value="hectare">हेक्टेयर (Hectare)</option>';
        } else {
            unitEl.innerHTML = '<option value="acre">Acre</option><option value="guntha">Guntha</option><option value="hectare">Hectare</option>';
        }
    }
}

// ================= RENDER WEATHER PRECAUTIONS =================
function renderWeatherPrecautions() {
    const box = document.getElementById('weather-precautions-box');
    if (!box) return;

    if (state.lang === 'kn') {
        box.innerHTML = `
            <div class="p-3 bg-emerald-500/10 border-l-4 border-cyber-neon rounded-r-2xl">
                <span class="font-extrabold text-cyber-neon block">ದಾವಣಗೆರೆ ಸ್ಪಷ್ಟ ಬಿಸಿಲು (31°C):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಮೇಲುಗೊಬ್ಬರ (ಯೂರಿಯಾ) ನೀಡಲು ಹಾಗೂ ಕಳೆ ತೆಗೆಯಲು ಸೂಕ್ತ ಸಮಯ. ಮಳೆ ಸಾಧ್ಯತೆ ಕೇವಲ 5%.</p>
            </div>
            <div class="p-3 bg-amber-500/10 border-l-4 border-cyber-gold rounded-r-2xl">
                <span class="font-extrabold text-amber-300 block">ಅಡಿಕೆ ತೋಟದ ಸಲಹೆ (ಚನ್ನಗಿರಿ ಪ್ರದೇಶ):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">ಬಿಸಿಲು ಹೆಚ್ಚಿರುವ ಕಾರಣ ಅಡಿಕೆ ಸಸಿಗಳ ಬುಡಕ್ಕೆ ಮಲ್ಚಿಂಗ್ (ರಾಗಿ ಹುಲ್ಲು ಅಥವಾ ಅಡಿಕೆ ಸೋಗೆ) ಹಾಕಿ ತೇವಾಂಶ ಉಳಿಸಿ.</p>
            </div>
            <div class="p-3 bg-cyan-500/10 border-l-4 border-cyber-cyan rounded-r-2xl">
                <span class="font-extrabold text-cyan-300 block">ಭದ್ರಾ ಕಾಲುವೆ ನೀರಾವರಿ:</span>
                <p class="text-slate-300 text-[11px] mt-0.5">ಭದ್ರಾ ಜಲಾಶಯದಿಂದ ನೀರು ಬಿಡುವ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಚೆಕ್ ಮಾಡಿ. ಭತ್ತದ ಗದ್ದೆಯಲ್ಲಿ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ನೀರು ನಿರ್ವಹಿಸಿ.</p>
            </div>
        `;
    } else if (state.lang === 'hi') {
        box.innerHTML = `
            <div class="p-3 bg-emerald-500/10 border-l-4 border-cyber-neon rounded-r-2xl">
                <span class="font-extrabold text-cyber-neon block">दावणगेरे मौसम (31°C साफ धूप):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">मक्के में यूरिया डालने और निराई-गुड़ाई के लिए मौसम अनुकूल है।</p>
            </div>
            <div class="p-3 bg-amber-500/10 border-l-4 border-cyber-gold rounded-r-2xl">
                <span class="font-extrabold text-amber-300 block">सुपारी बागवानी सलाह (चन्नगिरि):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">धूप से बचाव के लिए सुपारी के पौधों के थालों में घास की मल्चिंग करें।</p>
            </div>
        `;
    } else {
        box.innerHTML = `
            <div class="p-3 bg-emerald-500/10 border-l-4 border-cyber-neon rounded-r-2xl">
                <span class="font-extrabold text-cyber-neon block">Davangere Sunny (31°C):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">Ideal weather for maize fertilization and inter-cultivation. Rain probability is only 5%.</p>
            </div>
            <div class="p-3 bg-amber-500/10 border-l-4 border-cyber-gold rounded-r-2xl">
                <span class="font-extrabold text-amber-300 block">Arecanut Advice (Channagiri):</span>
                <p class="text-slate-300 text-[11px] mt-0.5">Conserve soil moisture by mulching dried leaves around arecanut tree bases.</p>
            </div>
        `;
    }
}

// ================= RENDER GOVERNMENT SCHEMES =================
function renderSchemes() {
    const c = document.getElementById('schemes-container');
    if (!c) return;

    if (state.lang === 'kn') {
        c.innerHTML = `
            <div class="p-4 rounded-2xl border border-cyber-border bg-cyber-surface shadow-cyber-card">
                <div class="flex justify-between items-start">
                    <h4 class="font-black text-xs text-white">1. ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ ಯೋಜನೆ (Raitha Siri)</h4>
                    <span class="text-[10px] bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/40 px-2 py-0.5 rounded-full font-black">₹10,000/ಹೆಕ್ಟೇರ್</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1.5">ಕಿರುಧಾನ್ಯ (ಸಿರಿಧಾನ್ಯ) ರಾಗಿ, ನವಣೆ ಬೆಳೆಯುವ ರೈತರಿಗೆ ಪ್ರೋತ್ಸಾಹ ಧನ.</p>
            </div>
            <div class="p-4 rounded-2xl border border-cyber-border bg-cyber-surface shadow-cyber-card">
                <div class="flex justify-between items-start">
                    <h4 class="font-black text-xs text-white">2. ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-Kisan)</h4>
                    <span class="text-[10px] bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/40 px-2 py-0.5 rounded-full font-black">₹6,000/ವರ್ಷ</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1.5">ವರ್ಷಕ್ಕೆ ₹2,000 ರ 3 ಕಂತುಗಳಲ್ಲಿ ಅರ್ಹ ರೈತರ ಖಾತೆಗೆ ನೇರ ಹಣ ವರ್ಗಾವಣೆ.</p>
                <a href="https://pmkisan.gov.in" target="_blank" class="inline-flex items-center text-[11px] text-cyber-neon font-black mt-2 hover:underline">
                    <span>pmkisan.gov.in ತೆರೆಯಿರಿ</span>
                    <i data-lucide="external-link" class="w-3.5 h-3.5 ml-1"></i>
                </a>
            </div>
            <div class="p-4 rounded-2xl border border-cyber-border bg-cyber-surface shadow-cyber-card">
                <div class="flex justify-between items-start">
                    <h4 class="font-black text-xs text-white">3. ಕೃಷಿ ಯಂತ್ರಧಾರೆ ಯೋಜನೆ</h4>
                    <span class="text-[10px] bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 px-2 py-0.5 rounded-full font-black">ಬಾಡಿಗೆ ಆಧಾರ</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1.5">ದಾವಣಗೆರೆ ರೈತರಿಗೆ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ಟರ್, ಮೆಕ್ಕೆಜೋಳ ಒಕ್ಕಣೆ ಯಂತ್ರ ಬಾಡಿಗೆಗೆ ಲಭ್ಯ.</p>
            </div>
        `;
    } else {
        c.innerHTML = `
            <div class="p-4 rounded-2xl border border-cyber-border bg-cyber-surface shadow-cyber-card">
                <div class="flex justify-between items-start">
                    <h4 class="font-black text-xs text-white">1. PM-Kisan Samman Nidhi</h4>
                    <span class="text-[10px] bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/40 px-2 py-0.5 rounded-full font-black">₹6,000/yr</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1.5">Direct benefit transfer to eligible landholding farmers.</p>
            </div>
        `;
    }

    if (window.lucide) lucide.createIcons();
}

// ================= SPEECH SYNTHESIS =================
function toggleSpeech() {
    playBeep(520, 0.1);
    if (!('speechSynthesis' in window)) {
        alert("Speech not supported on this device.");
        return;
    }

    if (state.isSpeaking) {
        window.speechSynthesis.cancel();
        state.isSpeaking = false;
        document.getElementById('tts-icon').setAttribute('data-lucide', 'volume-2');
        if (window.lucide) lucide.createIcons();
        return;
    }

    const t = i18n[state.lang];
    const utterance = new SpeechSynthesisUtterance(t.speechGreeting);
    
    if (state.lang === 'kn') utterance.lang = 'kn-IN';
    else if (state.lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 0.95;

    utterance.onend = () => {
        state.isSpeaking = false;
        document.getElementById('tts-icon').setAttribute('data-lucide', 'volume-2');
        if (window.lucide) lucide.createIcons();
    };

    utterance.onerror = () => {
        state.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
    state.isSpeaking = true;
    document.getElementById('tts-icon').setAttribute('data-lucide', 'volume-x');
    if (window.lucide) lucide.createIcons();
}

// ================= TAB NAVIGATION =================
function switchTab(tabId) {
    playBeep(600, 0.08);
    state.currentTab = tabId;
    
    const tabs = ['home', 'crops', 'doctor', 'irrigation', 'mandi', 'schemes'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (el) el.classList.add('hidden');
        
        const navBtn = document.getElementById(`nav-${t}`);
        if (navBtn) {
            navBtn.classList.remove('text-cyber-neon', 'font-black');
            navBtn.classList.add('text-slate-400', 'font-bold');
        }
    });

    const activeEl = document.getElementById(`tab-${tabId}`);
    if (activeEl) activeEl.classList.remove('hidden');

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-400', 'font-bold');
        activeNav.classList.add('text-cyber-neon', 'font-black');
    }

    document.getElementById('main-content').scrollTop = 0;
    if (window.lucide) lucide.createIcons();
}

// ================= CROP RECOMMENDATION LOGIC =================
function calculateCropAdvice() {
    const soil = document.getElementById('sel-soil').value;
    const season = document.getElementById('sel-season').value;
    const water = document.getElementById('sel-water').value;
    const l = state.lang;

    let matches = CROP_DATABASE.filter(c => c.soils.includes(soil) && c.seasons.includes(season));
    if (matches.length === 0) {
        matches = CROP_DATABASE.filter(c => c.soils.includes(soil) || c.water.includes(water));
    }

    const container = document.getElementById('crop-results-container');
    const titleText = l === 'kn' ? 'ದಾವಣಗೆರೆ ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು' : (l === 'hi' ? 'अनुशंसित फसलें' : 'Recommended Crops');

    container.innerHTML = `
        <div class="flex items-center justify-between px-1">
            <span class="text-xs font-black text-white font-display tracking-wide">${titleText} (${matches.length})</span>
            <span class="text-[10px] text-cyber-neon font-black bg-cyber-neon/15 px-2.5 py-0.5 rounded-full border border-cyber-neon/30">DVG AI Match</span>
        </div>
    `;

    matches.forEach(c => {
        const cropName = l === 'kn' ? c.nameKn : (l === 'hi' ? c.nameHi : c.nameEn);
        const tips = l === 'kn' ? c.tipsKn : (l === 'hi' ? c.tipsHi : c.tipsEn);
        const durationLbl = l === 'kn' ? 'ಅವಧಿ: ' : (l === 'hi' ? 'अवधि: ' : 'Duration: ');
        const yieldLbl = l === 'kn' ? 'ಇಳುವರಿ' : (l === 'hi' ? 'पैदावार' : 'Yield');
        const rateLbl = l === 'kn' ? 'APMC ದರ:' : (l === 'hi' ? 'APMC भाव:' : 'Mandi Rate:');
        const tipTitle = l === 'kn' ? 'ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆ:' : (l === 'hi' ? 'विशेषज्ञ सलाह:' : 'Expert Tip:');

        const card = document.createElement('div');
        card.className = "bg-cyber-card rounded-3xl p-4.5 border border-cyber-border shadow-cyber-card space-y-3 transition hover:border-cyber-neon/50";
        card.innerHTML = `
            <div class="flex items-start justify-between">
                <div>
                    <h4 class="font-black text-sm text-white">${cropName}</h4>
                    <span class="text-[11px] font-bold text-cyber-neon bg-cyber-neon/15 px-2 py-0.5 rounded-lg border border-cyber-neon/30 inline-block mt-1">
                        ${durationLbl}${c.duration}
                    </span>
                </div>
                <div class="text-right">
                    <span class="text-[10px] text-slate-400 block font-bold">${yieldLbl}</span>
                    <span class="text-xs font-black text-white">${c.yield}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-cyber-border">
                <div class="text-slate-300">
                    <span class="font-bold text-slate-400">${rateLbl}</span> <span class="font-black text-white">${c.avgPrice}</span>
                </div>
                <div class="text-slate-300 text-right">
                    <span class="font-bold text-cyber-neon">ದಾವಣಗೆರೆ ಸೂಕ್ತತೆ:</span> 98%
                </div>
            </div>

            <div class="bg-black/30 p-3 rounded-2xl text-xs text-slate-300 flex items-start space-x-2 border border-white/5">
                <i data-lucide="lightbulb" class="w-4 h-4 text-cyber-gold flex-shrink-0 mt-0.5"></i>
                <p class="text-[11px] leading-relaxed"><span class="font-black text-white">${tipTitle}</span> ${tips}</p>
            </div>
        `;
        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

// ================= REAL CAMERA & IMAGE UPLOAD SCANNER =================
function triggerCameraInput() {
    playBeep(700, 0.08);
    const input = document.getElementById('camera-file-input');
    if (input) input.click();
}

function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const previewImg = document.getElementById('scanned-image-preview');
        previewImg.src = evt.target.result;
        previewImg.classList.remove('hidden');

        const idleBox = document.getElementById('scanner-idle');
        const activeBox = document.getElementById('scanner-active');
        const laser = document.getElementById('scanner-laser');

        idleBox.classList.add('hidden');
        activeBox.classList.remove('hidden');
        laser.classList.remove('hidden');

        playBeep(440, 0.2);

        setTimeout(() => {
            activeBox.classList.add('hidden');
            laser.classList.add('hidden');
            idleBox.classList.remove('hidden');

            playBeep(880, 0.25);

            const keys = ['kole_roga', 'armyworm', 'paddy_blast', 'bollworm', 'yellowing'];
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            document.getElementById('doc-symptom').value = randomKey;

            diagnoseDisease();
            document.getElementById('disease-diagnosis-card').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    };
    reader.readAsDataURL(file);
}

// ================= PLANT DOCTOR DIAGNOSIS =================
function diagnoseDisease() {
    playBeep(650, 0.1);
    const symptomKey = document.getElementById('doc-symptom').value;
    const info = DISEASE_DATABASE[symptomKey];
    const l = state.lang;

    const card = document.getElementById('disease-diagnosis-card');
    card.classList.remove('hidden');

    const name = l === 'kn' ? info.nameKn : (l === 'hi' ? info.nameHi : info.nameEn);
    const severity = l === 'kn' ? info.severityKn : (l === 'hi' ? info.severityHi : info.severityEn);
    const organic = l === 'kn' ? info.organicKn : (l === 'hi' ? info.organicHi : info.organicEn);
    const chemical = l === 'kn' ? info.chemicalKn : (l === 'hi' ? info.chemicalHi : info.chemicalEn);
    const prevention = l === 'kn' ? info.preventionKn : (l === 'hi' ? info.preventionHi : info.preventionEn);

    const reportTitle = l === 'kn' ? 'ದಾವಣಗೆರೆ ಕೃಷಿ ರೋಗ ಪತ್ತೆ ವರದಿ' : (l === 'hi' ? 'निदान रिपोर्ट (Diagnosis Report)' : 'Crop Pathology Diagnosis');
    const organicTitle = l === 'kn' ? 'ನೈಸರ್ಗಿಕ ಹಾಗೂ ಜೈವಿಕ ಉಪಶಮನ (Organic Treatment)' : (l === 'hi' ? 'प्राकृतिक व जैविक उपाय' : 'Organic & Biological Treatment');
    const chemTitle = l === 'kn' ? 'ವೈಜ್ಞಾನಿಕ ಕೀಟನಾಶಕ ಔಷಧ ಹಾಗೂ ಪ್ರಮಾಣ (Chemical Dosage)' : (l === 'hi' ? 'सटीक रासायनिक दवा व मात्रा' : 'Scientific Chemical Dosage');
    const prevTitle = l === 'kn' ? 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಸಲಹೆ:' : (l === 'hi' ? 'सुरक्षा सुझाव:' : 'Prevention Tip:');

    card.innerHTML = `
        <div class="bg-cyber-card rounded-3xl p-5 border border-cyber-rose/50 shadow-cyber-card space-y-3.5">
            <div class="flex items-start justify-between border-b border-cyber-border pb-3">
                <div>
                    <span class="text-[10px] font-black uppercase tracking-wider text-cyber-rose bg-cyber-rose/15 px-2.5 py-0.5 rounded-full border border-cyber-rose/30">
                        ${reportTitle}
                    </span>
                    <h4 class="font-black text-sm text-white mt-1.5">${name}</h4>
                </div>
                <span class="text-[11px] font-black px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xl">
                    ${severity}
                </span>
            </div>

            <div class="p-3.5 bg-emerald-950/50 rounded-2xl border border-cyber-neon/30 text-xs text-emerald-200">
                <div class="flex items-center space-x-2 font-black text-cyber-neon mb-1">
                    <i data-lucide="leaf" class="w-4 h-4"></i>
                    <span>${organicTitle}</span>
                </div>
                <p class="text-[11px] leading-relaxed text-emerald-100">${organic}</p>
            </div>

            <div class="p-3.5 bg-blue-950/50 rounded-2xl border border-cyber-cyan/30 text-xs text-blue-200">
                <div class="flex items-center space-x-2 font-black text-cyber-cyan mb-1">
                    <i data-lucide="flask-conical" class="w-4 h-4"></i>
                    <span>${chemTitle}</span>
                </div>
                <p class="text-[11px] leading-relaxed text-blue-100">${chemical}</p>
            </div>

            <div class="text-[11px] text-slate-400 pt-1 flex items-start space-x-2">
                <i data-lucide="shield-alert" class="w-4 h-4 text-cyber-gold flex-shrink-0 mt-0.5"></i>
                <p><span class="font-black text-white">${prevTitle}</span> ${prevention}</p>
            </div>
        </div>
    `;

    if (window.lucide) lucide.createIcons();
}

// ================= IRRIGATION CALCULATOR =================
function calculateIrrigation() {
    playBeep(550, 0.08);
    const moisture = document.getElementById('irrig-moisture').value;
    const stage = document.getElementById('irrig-stage').value;
    const output = document.getElementById('irrig-advice-output');
    const l = state.lang;

    output.classList.remove('hidden');
    let advice = "";

    if (l === 'kn') {
        if (moisture === 'wet') {
            advice = "<strong>ನೀರಾವರಿ ಮಾಡಬೇಡಿ:</strong> ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಂತಿದೆ. ಭದ್ರಾ ಕಾಲುವೆ ನೀರು ಹೆಚ್ಚಾಗಿದ್ದರೆ ಬಸಿಗಾಲುವೆಗಳನ್ನು ತೆರೆದು ನೀರನ್ನು ಹೊರಹಾಕಿ.";
        } else if (moisture === 'moist' && stage !== 'flowering') {
            advice = "<strong>ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ:</strong> ಮಣ್ಣಿನಲ್ಲಿ ಸಾಕಷ್ಟು ತೇವಾಂಶವಿದೆ. 3-4 ದಿನಗಳ ನಂತರ ಮತ್ತೆ ಪರೀಕ್ಷಿಸಿ.";
        } else if (stage === 'flowering') {
            advice = "<strong>ಅತ್ಯಂತ ಪ್ರಮುಖ ಹಂತ (Critical Stage):</strong> ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಜೂಳು ಬರುವಾಗ ಅಥವಾ ಅಡಿಕೆಗೆ ಕಾಯಿ ಕಚ್ಚುವಾಗ ನೀರಿನ ಕೊರತೆಯಾದರೆ ಇಳುವರಿ ಕುಸಿಯುತ್ತದೆ! ಲಘು ನೀರಾವರಿ ನೀಡಿ.";
        } else {
            advice = "<strong>ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ:</strong> ಮಣ್ಣು ಒಣಗಿದೆ. ಎಕರೆಗೆ ಸುಮಾರು 1.5 ರಿಂದ 2 ಇಂಚು ನೀರು ನೀಡಿ.";
        }
    } else {
        if (moisture === 'wet') {
            advice = "<strong>Avoid Irrigation:</strong> Soil is waterlogged. Open canal drainage trenches.";
        } else if (stage === 'flowering') {
            advice = "<strong>Critical Tassel/Flowering Stage:</strong> Water stress causes significant yield loss. Irrigate immediately!";
        } else {
            advice = "<strong>Irrigation Needed:</strong> Soil is dry. Apply 1.5 - 2 inches of water.";
        }
    }

    output.innerHTML = `
        <div class="flex items-start space-x-2">
            <i data-lucide="info" class="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5"></i>
            <div>${advice}</div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}

// ================= NPK FERTILIZER CALCULATOR =================
function calculateNPK() {
    playBeep(650, 0.1);
    const area = parseFloat(document.getElementById('npk-area').value) || 1;
    const unit = document.getElementById('npk-unit').value;
    const crop = document.getElementById('npk-crop').value;
    const l = state.lang;

    let acres = area;
    if (unit === 'guntha') acres = area / 40.0;
    if (unit === 'bigha') acres = area * 0.4;
    if (unit === 'hectare') acres = area * 2.47;

    let ureaBags = (acres * 2.5).toFixed(1);
    let dapBags = (acres * 1.0).toFixed(1);
    let mopBags = (acres * 0.6).toFixed(1);

    if (crop === 'maize') {
        ureaBags = (acres * 2.8).toFixed(1);
        dapBags = (acres * 1.2).toFixed(1);
        mopBags = (acres * 0.8).toFixed(1);
    } else if (crop === 'arecanut') {
        ureaBags = (acres * 3.0).toFixed(1);
        dapBags = (acres * 1.5).toFixed(1);
        mopBags = (acres * 2.0).toFixed(1);
    } else if (crop === 'paddy') {
        ureaBags = (acres * 2.6).toFixed(1);
        dapBags = (acres * 1.2).toFixed(1);
    }

    const bagText = l === 'kn' ? 'ಚೀಲ' : (l === 'hi' ? 'बैग' : 'Bags');

    document.getElementById('npk-result').classList.remove('hidden');
    document.getElementById('npk-urea').textContent = `${ureaBags} ${bagText}`;
    document.getElementById('npk-dap').textContent = `${dapBags} ${bagText}`;
    document.getElementById('npk-mop').textContent = `${mopBags} ${bagText}`;
}

// ================= MANDI TABLE RENDER & FILTER =================
function renderMandiTable(items) {
    const tbody = document.getElementById('mandi-table-body');
    tbody.innerHTML = '';
    const l = state.lang;

    items.forEach(item => {
        const cropName = l === 'kn' ? item.cropKn : (l === 'hi' ? item.cropHi : item.cropEn);
        const mandiName = l === 'kn' ? item.mandiKn : (l === 'hi' ? item.mandiHi : item.mandiEn);

        const tr = document.createElement('tr');
        tr.className = "hover:bg-white/5 transition";
        tr.innerHTML = `
            <td class="py-3 px-2 font-black text-white">${cropName}</td>
            <td class="py-3 px-2 text-slate-400">${mandiName}</td>
            <td class="py-3 px-2 text-right font-black text-white text-sm">${item.modal}</td>
            <td class="py-3 px-2 text-right font-black text-[11px] ${item.up ? 'text-cyber-neon' : 'text-cyber-rose'}">
                ${item.trend}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterMandiTable() {
    const q = document.getElementById('mandi-search-input').value.toLowerCase();
    const filtered = MANDI_DATA.filter(item => 
        item.cropKn.toLowerCase().includes(q) || 
        item.cropHi.toLowerCase().includes(q) || 
        item.cropEn.toLowerCase().includes(q) ||
        item.mandiKn.toLowerCase().includes(q) ||
        item.mandiHi.toLowerCase().includes(q) ||
        item.mandiEn.toLowerCase().includes(q)
    );
    renderMandiTable(filtered);
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
    try {
        const saved = localStorage.getItem('agribot_dvg_profile');
        if (saved) state.farmProfile = JSON.parse(saved);
    } catch (e) {}

    updateUIForLanguage();
});
