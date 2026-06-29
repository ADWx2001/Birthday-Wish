import type { SiteContent } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the single source of truth for all copy, dates, quotes, photo
 *  filenames and the music file. Components never hardcode text — they read it
 *  from here. To personalise the site:
 *
 *    1. Replace the placeholder strings below with your own words.
 *    2. Drop real images into /public/photos (any name you like).
 *    3. Point each photo `src` at your file, e.g. "/photos/our-first-date.jpg".
 *    4. Drop your song into /public as the `music.src` filename.
 *
 *  The page keeps working with the generated placeholders until you do.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const content: SiteContent = {
  meta: {
    title: "Happy Birthday Suduu..❤️",
    description: "A little surprise!!",
  },

  loading: {
    message: "Preparing a little surprise...",
  },

  hero: {
    heading: "Happy Birthday",
    typewriter: [
      "මගේ ජීවිතේ ලස්සනම හමුවීම ඔයා... 🌸",
      "අපි අතර මොන දේවල් වුණත්, මගේ හිතේ ඔයාට තියෙන ආදරේ කවදාවත් වෙනස් වෙන්නේ නැහැ. බබා  ❤️",
      "මේ පුංචි surprise එක, ඔයා වෙනුවෙන් හැදුවේ...🎀",
      "අපේ පුංචි කතාව, (චුට්ටක් තියෙන්නේ මෙතන හරිද)  ✨",
    ],
    ctaLabel: "Begin Our Story",
  },

  story: {
    sectionTitle: "Our Story",
    sectionSubtitle: "Every chapter brought me closer to you.",
    chapters: [
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_01",
          src: "/image/firstday.png",
          alt: "The day we met",
        },
        heading: "The Day We Met",
        message:
          "I still remember the exact moment everything changed. The world felt a little brighter, and somehow I knew my life was about to become something wonderful.",
        animation: "slide-left",
      },
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_02",
          src: "/image/firstadventure.jpg",
          alt: "Our first adventure",
        },
        heading: "Our First Adventure",
        message:
          "We laughed until it hurt and lost track of time. Every little detail of that day is still painted somewhere in my heart.",
        animation: "slide-right",
      },
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_03",
          src: "/image/wheniknew.jpg",
          alt: "When I knew",
        },
        heading: "When I Knew",
        message:
          "There was a quiet, ordinary moment when I realised I never wanted to imagine a single day without you in it.",
        animation: "blur",
      },
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_04",
          src: "/image/througheverything.jpg",
          alt: "Through everything together",
        },
        heading: "Through Everything",
        message:
          "Good days and hard days, we faced them together. You have been my calm, my home, and my favourite person all at once.",
        animation: "scale",
      },
    ],
  },

  memories: {
    sectionTitle: "Little Moments",
    sectionSubtitle: "The small memories I keep coming back to.",
    cards: [
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_05",
          src: "/littlemoments/aquietevening.jpg",
          alt: "A quiet evening together",
        },
        date: "MEMORY_DATE_01",
        title: "A Quiet Evening",
        description:
          "Nothing special planned, just us and it became one of my favourite nights. මතකද එදා තෙමුනා හොදටම 🌧️💑",
      },
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_06",
          src: "/littlemoments/thattrip.jpg",
          alt: "That trip together",
        },
        date: "MEMORY_DATE_02",
        title: "That Trip",
        description:
          "New places are always better with you. කැම්පස් එකේ වැඩ ඉවර  වෙලා යන් ආයේ එදා මගටනේ ගියේ  🏍️⛰️,I would go anywhere, as long as it's with you.",
      },
      {
        photo: {
          placeholder: "PHOTO_PLACEHOLDER_07",
          src: "/littlemoments/justbecause.jpg",
          alt: "Just because",
        },
        date: "MEMORY_DATE_03",
        title: "Just Because",
        description:
          "A random afternoon I never want to forget. You make ordinary moments feel like magic. මතකද එදා කුක්කෝ වගයක් ඇවිත් හිටියා. 🐶",
      },
    ],
  },

  lights: {
    sectionTitle: "Lighting Up Our Journey",
    caption:
      "Every light is a memory we made together. Keep scrolling and watch them glow.",
    bulbCount: 7,
  },

  gallery: {
    sectionTitle: "Our Gallery",
    sectionSubtitle:
      "A few frames from a story I love telling. Photo tap කරලා බලන්න 😇",
    items: [
      // portrait 9:16 → span 1.79
      {
        photo: {
          placeholder: "image1",
          src: "/gallery/image1.jpg",
          alt: "A moment together",
        },
        span: 1.79,
      },
      // landscape 20:9 → span 0.45
      {
        photo: {
          placeholder: "image4",
          src: "/gallery/image4.jpg",
          alt: "A beautiful memory",
        },
        span: 0.45,
      },
      // portrait 9:16 → span 1.79
      {
        photo: {
          placeholder: "image3",
          src: "/gallery/image3.jpg",
          alt: "A moment together",
        },
        span: 1.79,
      },
      // landscape 16:9 → span 0.56
      {
        photo: {
          placeholder: "image7",
          src: "/gallery/image7.jpg",
          alt: "A beautiful memory",
        },
        span: 0.56,
      },
      // landscape 20:9 → span 0.45
      {
        photo: {
          placeholder: "image5",
          src: "/gallery/image5.jpg",
          alt: "A beautiful memory",
        },
        span: 0.45,
      },
      // portrait 9:16 → span 1.79
      {
        photo: {
          placeholder: "image6",
          src: "/gallery/image6.jpg",
          alt: "A moment together",
        },
        span: 1.79,
      },
      // square 1:1 → span 1.0
      {
        photo: {
          placeholder: "image2",
          src: "/gallery/image2.jpg",
          alt: "A beautiful memory",
        },
        span: 1.0,
      },
      // landscape 20:9 → span 0.45
      {
        photo: {
          placeholder: "image8",
          src: "/gallery/image8.jpg",
          alt: "A beautiful memory",
        },
        span: 0.45,
      },
      // portrait 9:16 → span 1.79
      {
        photo: {
          placeholder: "image11",
          src: "/gallery/image11.jpg",
          alt: "A moment together",
        },
        span: 1.79,
      },
      // landscape 20:9 → span 0.45
      {
        photo: {
          placeholder: "image9",
          src: "/gallery/image9.jpg",
          alt: "A beautiful memory",
        },
        span: 0.45,
      },
      // landscape 20:9 → span 0.45
      {
        photo: {
          placeholder: "image10",
          src: "/gallery/image10.jpg",
          alt: "A beautiful memory",
        },
        span: 0.45,
      },
    ],
  },

  cake: {
    sectionTitle: "Make a Wish",
    instruction: "The candles are lit and waiting for you.",
    buttonLabel: "Blow the Candles",
    wishMessage:
      "මේ ඉටි පන්දම් නිවන කොට ඔයා ප්‍රර්ථනා කරපු හැම දෙයක්ම හැම සතුටක්ම ඒ විදිහටම ඔයාට ලැබෙන්න ඕනේ මගේ මැණික. ඉස්ස්රහට වැඩ ටික පරිස්සමෙන් කරගමු.😇💫",
  },

  sky: {
    sectionTitle: "Our Little Universe",
    caption: "මෙතන තියෙන ඔයාට කැමති තරුවක් touch කරන්න. he hee 😇",
    starMessages: [
      "මන් හරි ආදරෙයි ඔයාට, ළමයෝ ❤️",
      "සමහර වෙලාවට කෑගැහුවට, තරහ නෑ නේද? 😕",
      "ඔයාගේ ඇස් වලට මන් ආසයි. 👀",
      "ඔයා කියවනකොට අහන් ඉන්න ආසයි. 🤭",
      "ලඟ ඉද්දි ඉඹින්නමයි හිතෙන්නේ. 🤭💏",
      "ඔයා අනේ මගේ ළමයෙක් වගේ. 👶🤗",
      "ඔයාව අවුස්සන්න මන් ගොඩක් ආසයි. 👿",
      "ඉස්සරහට මොනවා උනත් මන් ඔයාට ආදරෙයි. 💗🎀",
    ],
    shootingStarMessage:
      "I wished for forever with you — and here you are. Happy Birthday, මගේ මැණික.",
  },

  letter: {
    sectionTitle: "A Letter For You",
    hint: "Tap to open",
    greeting: "",
    body: `මගේ ලොකු මැඩම් වෙත, 💌

අපි දෙන්න හම්බුණ විදිහ මතකද? App එකකින් හම්බෙලා මෙච්චර දුරක් ආවා නේද අපි. ඉතින් ළමයෝ, අද දවස ගැන වෙනම කියන්න ඕනේ නෑනේ. කොච්චර විශේෂද කියනවනම් අද Galle Face එකේ වෙඩි මුරත් තියෙනවා. එච්චරටම special කෙනෙක් තමයි මගේ මැණික. 🎀

ඔයා ළඟ ඉන්නකොට වෙලාව යනවා දැනෙන්නේ නෑ. ⏱️ තුරුල් කරගෙන මට කතා කරනකොට, මට ඔයා ගැන දැනෙන්නේ මාරම ආදරයක්. 💕 ඔයා ගාව හරි අමුතු සුවඳක් තියෙනවා. ඒක Scent එකක් හරි වෙන මොනවත් නෙවෙයි... මට කියලා විස්තර කරන්න බැරි තරම් ලස්සන සුවඳක්. සමහරවිට ඒ ඔයාගේ ආදරේ සුවඳ වෙන්න ඇති. 😘🤭

ඔයා එදා ඉඳන් මට දෙන ආදරේට, මන් ගැන හොයලා බලන විදිහට, මාත් එක්ක හැම වෙලේම ඉන්නවට, හැම වෙලාවෙම මාවම තෝරගන්නවට... ඒ හැම දේකටම Thank You, පැටියෝ. ❤️

මන් දන්නවා මන් කලින් හැසිරුණු විදිහ වැරදියි. ඒ හැම දේකටම මට සමාවෙන්න හරිද? 🥺

අපි දෙන්නට තව ගොඩක් දේවල් කරන්න තියෙනවා. අපි NAVY එකට යන්න බල බල නේ හිටියේ නේද? මට ඒ කිසිම දෙයක් අමතක වෙලා නෑ. මන් කලින් කෑගැහුවේ තිබුණු Stress එක නිසා. මාත් එල්ලෙනවනේ ඉතිං ඔයත් එක්ක. 🤍

ඉස්සරහට මොනවා වුණත්, මන් හැමදාම ඔයා ළඟ ඉන්නවා. ඔයා එක්ක, ඔයාගේ හීන එක්ක, ඔයාගේ ලෝකේම කොටසක් වෙලා ඉන්නවා. 🌎💗

පස්සේ හම්බෙලා ඒ හැමදේම තව කතා කරමු හරිද? මට ඔයාට කියන්න ගොඩක් දේවල් තියෙනවා. 😊

ඉතින් මගේ චූටි මැණික...

සුභම සුභ උපන්දිනයක් වේවා!! 🕯️🎂😘

මන් හරි ආදරෙයි ඔයාට... අදත්, හෙටත්, හැමදාමත්. ❤️`,
    signature: "Asanka 💛",
  },

  quotes: [
    "In all the world, there is no heart for me like yours.",
    "You are, and always have been, my favourite chapter. රණ්ඩු උනා තමයි ආදරේටනේ , ඒ හැමදේටම සමාවදෙනවා නේද ❤️? ",
    "Whatever our souls are made of, yours and mine are the same.",
    "I would find you in any lifetime.",
  ],

  surprise: {
    sectionTitle: "One More Surprise",
    lockPrompt: "Enter the secret key to unlock it",
    // Playful hint — the code is her age.
    lockHint:
      "Guess කරන්න බලන්න මොකක්ද කියල code එක? වැරදුනොත් මං දෙන්නම් Tip එකක්..  😉",
    code: "26",
    wrongMessage:
      "වැරදුනා නේද, අද වෙද්දී 4th feb 2026, ඔයාගේ වයස කියක් වගේ ඇතිද?? ඒක ආයේ Try කරන්න බලන්න . 😘💛",
    heading: "We're Going Home",
    message:
      "This is the little dream we've been building together. Soon these walls, this door, this home ,all of it will be ours. Our next chapter starts here.",
    images: [
      {
        placeholder: "PHOTO_PLACEHOLDER_HOUSE_01",
        src: "/house/house1.PNG",
        alt: "Our future home",
      },
      {
        placeholder: "PHOTO_PLACEHOLDER_HOUSE_02",
        src: "/house/house2.PNG",
        alt: "Our future home",
      },
      {
        placeholder: "PHOTO_PLACEHOLDER_HOUSE_03",
        src: "/house/house3.PNG",
        alt: "Our future home",
      },
      {
        placeholder: "PHOTO_PLACEHOLDER_HOUSE_04",
        src: "/house/house4.PNG",
        alt: "Our future home",
      },
    ],
    closing:
      "Here's to our home, and every morning we'll wake up in it together.",
  },

  secretLetter: {
    sectionTitle: "A Letter Just for You 💌",
    lockPrompt: "Enter the secret code to open this letter",
    lockHint: "🔢 The answer is hiding somewhere near the top of the page…",
    wrongMessage: "That's not the right code — try again!",
    code: "16",
    heading: "My Dearest,",
    body: `Happy Birthday, my love! 🎂\n\nToday is all about you — the person who makes every single day brighter just by being in it. I hope this little corner of the internet made you smile, laugh, or maybe even tear up a little (the good kind!).\n\nEvery moment with you is a gift I never take for granted. You deserve every beautiful thing that comes your way — today and always. Thank you for choosing me, for believing in us, and for being exactly who you are.\n\nWith all my heart,`,
    signature: "Yours forever ❤️",
  },

  final: {
    photo: {
      placeholder: "PHOTO_PLACEHOLDER_FINAL",
      src: "/image/wheniknew.jpg",
      alt: "The moment I knew",
    },
    heading: "Happy Birthday My Love",
    paragraph: `සමහර දවස් ලස්සනයි...
සමහර දවස් ටිකක් අමාරුයි...
සමහර වෙලාවට අපි රණ්ඩු වෙනවා...
සමහර වෙලාවට අපි අපිට රිද්දගන්නවා...

ඒත් හැම දවසකම,
මගේ හිතේ ඔයාට තියෙන ආදරේ අඩු වුනේ නෑ, මන් පෙන්නන්නේ නැතුව ඇතී, Anyway මන් හරි ආදරෙයි ළමයෝ ❤️💑.

සුභ උපන්දිනයක්, මගේ ලොකු මැඩම්. ❤️`,
    signature: "All my love, always",
    loveLine: "I Love You",
    closingLine: "Thank you for being the most beautiful part of my life.",
  },

  footer: {
    madeWith: "Made by Asanka with much love",
  },

  secrets: {
    heartClickMessage:
      "You found a secret — just like you found a way into my heart. 💛",
  },

  music: {
    // Drop your song into /public and update this filename.
    src: "/AUDIO_PLACEHOLDER.mp3",
    title: "Our Song",
  },
};

export default content;
