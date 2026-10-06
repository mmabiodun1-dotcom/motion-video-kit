// GroSolar "Switch Off" animatic timeline. Times in seconds, 1080x1920.
// Mirrors STORYBOARD.md. Photo shots look for frames/<id>.jpg and show a placeholder card until it exists.
// kind: photo | grid | tag | offer | phone | sprout | end
// push: Ken Burns move as [scaleFrom, scaleTo, xFrom, xTo, yFrom, yTo] (x/y in px).
// sup: super (top). cap: speaker caption. vo: narrator line. dram: show the "Dramatisation" label.
// screenPin: pin a code-built app screen onto a blank phone in the photo (quad in source-image pixels).
window.TIMELINE = {
  fps: 30,
  duration: 60,
  width: 1080,
  height: 1920,
  shots: [
    { n: '1', id: '01', t0: 0.0, t1: 2.0, kind: 'photo', mood: 'before', title: 'Generator hook', prompt: 'Chat A · #1 (edit of #4)',
      push: [1.12, 1.04, 0, 0, 0, 0] },
    { n: '2', id: '02', t0: 2.0, t1: 4.0, kind: 'photo', mood: 'before', title: 'Switch off', prompt: 'Chat A · #2 (edit of #1)',
      push: [1.04, 1.0, 0, 0, 0, 0], sup: 'What if you never had to switch it <em>on</em> again?', supAt: 0.45, dotOut: true },
    { n: '3', id: '03', t0: 4.0, t1: 6.5, kind: 'photo', mood: 'before', title: 'Home, power cut', prompt: 'Chat B · #3',
      push: [1.0, 1.06, 0, 0, 0, -20], cap: { who: 'Mum', line: '"Dem don take light again!"' }, dram: true, dotIn: true },
    { n: '4', id: '04', t0: 6.5, t1: 9.0, kind: 'photo', mood: 'before', title: 'Compound, gen', prompt: 'Chat A · #4',
      push: [1.06, 1.0, 30, -30, 0, 0], cap: { who: 'Dad', line: '"Who go buy fuel today?"' }, dram: true },
    { n: '5', id: '05', t0: 9.0, t1: 11.5, kind: 'photo', mood: 'before', title: 'Barbershop', prompt: 'Existing Gemini frame',
      push: [1.0, 1.05, 0, 0, 0, 10], cap: { who: 'Barber', line: '"Abeg, on the gen!"' }, dram: true },
    { n: '6', id: '06', t0: 11.5, t1: 14.0, kind: 'photo', mood: 'before', title: 'Farm', prompt: 'Chat F · #6 fix',
      push: [1.0, 1.06, 0, 0, 0, 0], sup: 'Diesel today.<br><em>Diesel tomorrow.</em>', supAt: 0.3, dram: true, tbc: 'Farms unconfirmed' },
    { n: '7', id: '07', t0: 14.0, t1: 16.5, kind: 'photo', mood: 'before', title: 'Factory', prompt: 'Existing Gemini frame',
      push: [1.06, 1.0, -20, 20, 0, 0], dram: true, tbc: 'C&I unconfirmed' },
    { n: '8', t0: 16.5, t1: 19.0, kind: 'grid', mood: 'before', title: 'Everybody dey run gen', tiles: ['03', '05', '06', '07'], receipt: true,
      vo: 'Everybody dey run gen.' },
    { n: '9', id: '09', t0: 19.0, t1: 21.5, kind: 'tag', mood: 'before', title: 'Solar? E too cost.', prompt: 'Chat C · #9',
      push: [1.0, 1.05, 0, 0, 0, 0], cap: { who: 'Dad', line: '"Solar? E too cost."' }, capAt: 0.9, dram: true },
    { n: '10', t0: 21.5, t1: 24.0, kind: 'offer', mood: 'brand', title: 'The offer', xin: 0.25, voAt: 0.2,
      vo: 'Not with GroSolar. No large upfront cost. You pay monthly.' },
    { n: '11', t0: 24.0, t1: 26.0, kind: 'phone', screen: 'landing', mood: 'brand', title: 'Get started', sup: 'grosolar.co', supAt: 0.5 },
    { n: '12', t0: 26.0, t1: 28.0, kind: 'phone', screen: 'info', mood: 'brand', title: 'Step 1 · About you', vo: 'Get started on grosolar.co.' },
    { n: '13', t0: 28.0, t1: 30.5, kind: 'phone', screen: 'property', mood: 'brand', title: 'Step 2 · Home or business', vo: 'Your house or your business.' },
    { n: '14', t0: 30.5, t1: 33.0, kind: 'phone', screen: 'energy', mood: 'brand', title: 'Step 3 · What you power', sup: 'Tell us what you power', supAt: 0.2 },
    { n: '15', t0: 33.0, t1: 35.5, kind: 'phone', screen: 'provider', mood: 'brand', title: 'Step 4 · Provider and site visit', vo: 'Dem go come check your place first.' },
    { n: '16', t0: 35.5, t1: 38.5, kind: 'phone', screen: 'proposal', mood: 'brand', title: 'Proposal', vo: 'Pay small small, every month.', voAt: 0.3,
      sup: 'No Large Upfront Costs · Predictable Monthly Cost', supAt: 0.6 },
    { n: '17', id: '17', t0: 38.5, t1: 41.5, kind: 'photo', mood: 'after', title: 'Installation', prompt: 'Chat A · #17 (edit of #4)',
      push: [1.06, 1.0, 30, -30, 0, 0], sup: "Installed by GroSolar's partner solar providers", supAt: 0.3, dram: true },
    { n: '18', id: '18', t0: 41.5, t1: 44.0, kind: 'photo', mood: 'after', title: 'Activation', prompt: 'Chat A · #18 (edit of #17)',
      push: [1.05, 1.0, 0, 0, 0, 0], vo: 'Your plan, inside the GroSolar app.', dram: true,
      // Blank grey phone screen: corners measured by `python3 screen_quad.py 18 --box 260,450,360,600` (frames/quads.js).
      screenPin: { quad: [[289.6, 485], [327, 485], [327, 573], [287, 573]], label: 'App screen from GroSolar to come' } },
    { n: '19', id: '19', t0: 44.0, t1: 46.5, kind: 'photo', mood: 'after', title: 'Home, payoff', prompt: 'Chat B · #19 (edit of #3)',
      push: [1.0, 1.06, 0, 0, 0, -20], cap: { who: 'Mum', line: '"Light dey!"' }, dram: true },
    { n: '20', id: '20', t0: 46.5, t1: 48.5, kind: 'photo', mood: 'after', title: 'Barbershop, payoff', prompt: 'Chat E · #20 fix',
      push: [1.0, 1.05, 0, 0, 0, 10], cap: { who: 'Customer', line: '"Correct!"' }, dram: true },
    { n: '21', id: '21', t0: 48.5, t1: 51.0, kind: 'photo', mood: 'after', title: 'Farm, payoff', prompt: 'Chat F · #21 fix',
      push: [1.0, 1.06, 0, 0, 0, 0], dram: true, tbc: 'Farms unconfirmed' },
    { n: '22', id: '22', t0: 51.0, t1: 53.0, kind: 'photo', mood: 'after', title: 'Factory, payoff', prompt: 'Existing Gemini frame',
      push: [1.06, 1.0, -20, 20, 0, 0], dram: true, tbc: 'C&I unconfirmed' },
    { n: '23', t0: 53.0, t1: 55.0, kind: 'sprout', mood: 'after', title: 'Gen don rest', tiles: ['19', '20', '21', '22'], vo: 'Gen don rest.' },
    { n: '24', t0: 55.0, t1: 60.0, kind: 'end', mood: 'brand', title: 'End card' }
  ],
  // #11-16: the #11b hand-and-phone still, pushed in phonePush x and centred at phoneCenterY, screens pinned into its grey screen.
  // Falls back to a code-built phone on the #11a plate when 11b (or its quad from screen_quad.py) is missing.
  phoneShot: '11b',
  phonePush: 1.9,
  phoneCenterY: 960,
  phonePlate: '11a',
  whatsapp: '+234 705 370 0000',
  whatsappConfirmed: false,
  endVo: { at: 57.0, text: 'GroSolar. Switch off the gen.' }
};
