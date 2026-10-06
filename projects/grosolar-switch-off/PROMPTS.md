# GroSolar — "Switch Off" · Gemini prompt library

Every prompt is ready to paste. Numbers match the storyboard shots. Each one is the shot description (with the CAST written out, so Gemini sees the locked wardrobe) followed by the STYLE BLOCK from `LOOK_BIBLE.md`.

- **Fresh** = start the chat with this prompt.
- **Edit** = paste into the same Gemini chat, right after the image it builds on (render rule b). Where an edit builds on an earlier image in the chat, re-upload that image with the prompt if Gemini drifts.
- **Fix** = narrow edit on an existing frame (render rule c).
- After every render: **Download full size** (rule e), name the file `NN-shot-name.png`, and send it over for the ledger.

## Run order (one Gemini chat per thread)

| Chat | Prompts, in order | Why together |
|---|---|---|
| A · Compound | #4 → #1 → #2 → #17 → #18 | Same generator, same bungalow, same DAD |
| B · Home interior | #3 → #19 | Before/after pair |
| C · Market | #9 | Stand-alone |
| D · Phone plates | #11a → #11b | Plates for the code-built screens |
| E · Barbershop (existing chat) | #20 fix | Fixes the after |
| F · Farm (existing chat) | #6 fix → #21 fix | Fixes both bars and the pump |
| — | #5, #7, #22 | Already rendered: just **Download full size** from their chats |

Not photographic (built in code or in the edit, per rule d): #8 grid and receipt, #10 offer, #12–#16 form screens, #23 grid, #24 end card.

---

## Chat A · Compound

### #4 · Compound, before — Fresh
Night in a small walled compound outside a modest Lagos bungalow. DAD (Nigerian man, about 45, short hair, neat moustache, white singlet under an open short-sleeved navy-and-white checked shirt, dark shorts, rubber slippers) yanks the pull-cord of a red-and-black petrol generator, his face strained and fed up. Exhaust smoke curls up under a bare security bulb. Over the compound wall, a neighbour's generator pours out more smoke. Iron gate, corrugated roof edge, a plastic chair, a jerrycan by the generator. Medium-wide shot at eye level, DAD and the generator fill most of the frame. Dim, hazy, sodium-orange light against a dusky blue sky. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #1 · Generator hook — Edit (of #4)
Same generator, same night, same light. Now: an extreme macro close-up of the generator's control panel, filling the frame. A chunky round rocker switch in the ON position glows with a small amber indicator light. Scuffed red-and-black painted metal, oil smudges, exhaust haze drifting across. The switch sits dead centre, the panel shaking slightly with the engine. 100mm macro feel, very shallow depth of field. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #2 · Switch off — Edit (of #1)
Same image, same camera. Now: DAD's hand (Nigerian man's hand, the cuff of a navy-and-white checked shirt) enters from the right and has just flipped the round switch to OFF. The amber indicator light is out, the panel is still, and the exhaust haze is thinning. Keep everything else identical. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #17 · Installation — Edit (of #4; re-upload #4 if needed)
Same compound and bungalow as the night image, same camera angle, now at golden hour on a clear day. Two INSTALLERS (Nigerian men, about 25 and about 35, plain navy work shirts and trousers, orange high-visibility vests, white hard hats, work gloves) stand on a ladder and the roof edge, lifting a solar panel into place beside a neat row of panels already fitted. DAD (same white singlet, open navy-and-white checked shirt, dark shorts, rubber slippers) watches from below with his hands on his hips, smiling. The red-and-black generator sits under a fitted cloth cover. Clean air, warm golden light. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #18 · Activation — Edit (of #17)
Same compound, same golden-hour light, panels now finished on the roof. Now: a closer medium shot by the front door. The older INSTALLER (about 35, navy work shirt, orange high-visibility vest, white hard hat) hands a black smartphone to MUM (Nigerian woman, about 40, hair pulled back in a low bun, sleeveless knee-length dress in a brown-and-cream patterned ankara print), who takes it with a relaxed smile. The phone screen faces the camera and shows a plain flat mid-grey screen with nothing on it. DAD stands just behind her. The covered generator is soft in the background. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

---

## Chat B · Home interior

### #3 · Home, before — Fresh
Night inside a modest, tidy Lagos bungalow living room just after the power has gone out: cream walls, brown curtains, a dark wooden dining table, a standing fan that has stopped, the ceiling bulb dead. DAUGHTER (Nigerian girl, about 10, hair in neat braids pulled back with a white headband, pale pink short-sleeved T-shirt) sits at the table over an exercise book with a pencil. MUM (Nigerian woman, about 40, hair pulled back in a low bun, sleeveless knee-length dress in a brown-and-cream patterned ankara print) stands beside her holding up a smartphone torch, one hand on her hip, frustrated. The phone torch is the only light, cool white on their faces; faint generator smoke drifts past the dark window. Medium shot at eye level, mother and daughter fill most of the frame. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #19 · Home, after — Edit (of #3)
Same image, same camera, same people. Now: the power is on and steady. The ceiling bulb glows warm, the standing fan is turning, and warm golden light fills the room. MUM has put the phone away and sits beside DAUGHTER, relaxed and smiling, while DAUGHTER writes, calm and focused. Through the window, the edge of a solar panel on the neighbour's roof catches the last light. Same wardrobe, same table, same room. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

---

## Chat C · Market

### #9 · "Solar? E too cost." — Fresh
Hazy late afternoon at a busy Lagos electrical market stall stacked with solar panels, boxed inverters and batteries. DAD (Nigerian man, about 45, short hair, neat moustache, white singlet under an open short-sleeved navy-and-white checked shirt, dark shorts, rubber slippers) holds up a blank paper price tag hanging from a solar panel and pulls back from it, eyebrows raised, mouth open in disbelief: the price is too much. The trader behind the stall shrugs. Dusty air, crowded stalls soft in the background. Medium close-up, DAD's face and the tag are the focus. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

*(The tag stays blank. The "E too cost" line and the price-tag stamp are added in the edit, per rule d.)*

---

## Chat D · Phone plates (Act 3 background)

### #11a · Street plate — Fresh
A bright, sunny Lagos street in the late morning, seen from the pavement: colourful shopfronts, a yellow danfo bus passing, palm trees, people walking, all softly out of focus with creamy bokeh so it works as a background. Warm golden sunlight, clean clear air, solar panels on a couple of rooftops. No single person in sharp focus. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #11b · Hand and phone — Edit (of #11a)
Same street, same background, same light. Now: in the foreground, a Nigerian woman's hand holds a black smartphone upright, facing the camera, thumb resting near the bottom of the screen. The phone screen is a plain flat mid-grey with nothing on it. The phone fills most of the frame and is in sharp focus; the street stays soft behind it. Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

*(The grosolar.co screens for #11–#16 are built in code and placed on this grey screen.)*

---

## Fixes (narrow edits on existing frames)

### #20 · Barbershop, after — Fix (in the existing barbershop chat)
Keep everything identical: same barber, same boy, same pose, same lighting, same room, same street through the door. Change only two things: the BARBER's left hand no longer holds the phone torch (he has put the phone away and that hand rests on the boy's shoulder), and the image fills the full vertical frame with no black bar at the top (extend the ceiling upward to fill it). Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #6 · Farm, before — Fix (in the existing farm chat)
Keep everything identical: same FARMER, same pose, same jerrycans, same smoking diesel pump, same field and light. Change only one thing: the image fills the full vertical frame with no black bars at the top or bottom (extend the hazy sky upward and the soil downward to fill them). Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

### #21 · Farm, after — Fix (in the existing farm chat)
Keep everything identical: same FARMER, same smile, same pose, same field, same small solar array, same golden light, same camera. Change only three things: the diesel pump becomes a small, clean electric water pump with a cable running to the solar array, with water still gushing from its hose into the beds; the yellow jerrycans are removed completely; and the image fills the full vertical frame with no black bars (extend the sky upward and the leaves downward). Photorealistic cinematic film still, vertical 9:16 portrait, full-bleed edge to edge, no borders, no black bars, no letterbox. Shot on 35mm, shallow depth of field, slight film grain. Lagos, Nigeria, present day. Colour grade with navy-blue shadows and warm orange-gold highlights. Natural Nigerian skin tones. No text, no logos, no brand names, no watermarks.

---

## Already rendered — just download full size

| Shot | File so far | Action |
|---|---|---|
| #5 barbershop, before | `frames/gemini/gemini-05-barbershop-before` | Download full size |
| #7 factory, before | `frames/gemini/gemini-07-factory-before` | Download full size |
| #22 factory, after | `frames/gemini/gemini-22-factory-after` | Download full size |

These were rendered before the STYLE BLOCK existed. If they look off-grade next to the new frames in the animatic, use one narrow edit each: *"Keep everything identical. Change only the colour grade: navy-blue shadows and warm orange-gold highlights."*
