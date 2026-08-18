# spacetobe.xyz — how this repo works

Small and hand-maintained. No generator, no build step. Edit the HTML, commit, push.

GitHub Pages from `main` on `beingwithjohn/spacetobe-xyz`, CNAME `spacetobe.xyz`, HTTPS enforced.

| Path | What it is |
|---|---|
| `index.html` | the home page — a continuous editorial landing page with an entry threshold, one file |
| `start.html` | the contact form; also embedded as an iframe overlay by the other pages |
| `practice-map/` | the practice map, Space to Be's own version of the Beings Club one |
| `404.html` | the no-scroll not-found page, using the same palette and ring system |
| `images/` | all assets |

## Deploying

There is no deploy script here. Push, then **verify by bytes** — GitHub's Pages build API
has reported a stale commit for a deploy that was already live, so don't trust "built":

```bash
git add -A && git commit -m "…" && git push origin main
# then poll until the served page matches what you have locally
until [ "$(curl -fsS https://spacetobe.xyz/ | shasum | cut -d' ' -f1)" = "$(shasum index.html | cut -d' ' -f1)" ]; do sleep 6; done; echo live
```

## The design system

Defined in `index.html`'s `:root`. The site is a quiet editorial sibling of j-hn.info and
Beings Club: warm mineral paper, forest ink, restrained hairlines, and one clean sans-serif
system. LT Remark is reserved for a single warm interruption inside major headlines. Do not
introduce a third typographic voice or use LT Remark for whole sections.

The green ring is the brand and primary visual gesture. Its loading sequence belongs to the
threshold; on entry it breathes once, travels into the hero field, and dissolves into the
abstract green-and-gold atmosphere. On the landing itself, the explicit ring appears only as
the small top-left logo. Do not scatter extra rings through ordinary content or introduce a
competing decorative system.

The home page is a fixed, single-viewport experience. For you, How, John, and Money open as
full-canvas editorial sheets while the same header and exploration navigation persist. The
interface floats directly on the canvas: there is no visible top bar or bottom bar. Desktop
uses an explicit unnumbered navigation; mobile uses one clear EXPLORE SPACE TO BE control
that reveals the four destinations. The rectangular conversation CTA is also a persistent
overlay across Home and all four sheets; the enquiry iframe covers it once someone begins
writing. Every sheet should fit without scrolling at normal
viewports. A very-short-height emergency tier may scroll the active sheet so zoom, landscape
phones, and unusually short screens never make content inaccessible.

The working palette is mineral paper, near-black ink, the green of the circle, and a restrained
gold atmosphere used only in the home hero glow. The gold is part of the supplied design and
should not be removed during simplification. The design-studio references show up through
space, scale, mixed serif/sans typography, and tiny functional controls—not through a larger
decorative palette.

The circle is an inline SVG system, not a CSS border or bitmap. At the threshold, its opening
sequence is deliberately finite: one breath, one move, one dissolve into atmospheric colour.
It expresses space and arrival without becoming a separate experience to navigate. Keep the
SVG inline when refining the handoff; an external image would make the movement and interaction
harder to control.

## Things worth knowing

**The contact overlay.** Every `a[href="start.html"]` is intercepted and opens `start.html`
in a full-screen iframe instead of navigating. The iframe posts `spacetobe:close-form` to
close. If you add a CTA, point it at `start.html` and it joins the pattern for free.

**Images must be resized before committing.** The portrait in the intro section came from a
2.2MB original; it ships at 1500px / 411KB as `images/john-portrait.jpg`. The 2127px
originals (`DSC00393.*`) are kept in `images/` but never served.
`sips -Z 1500 --setProperty formatOptions 78 in.jpg --out out.jpg` is enough.

**The practice map is a sibling, not a copy.** `practice-map/` carries the same content as
beingsclub.com's but rebuilt in this design system. Copy changes usually need applying to
both — they are separate repos and nothing syncs them. Beings Club's version is at
`../Beings Club/practice-map/index.html`; read that repo's `AGENTS.md` first, because its
six main pages are generated and must not be hand-edited.

Its long-form layout uses the same mineral paper, forest ink, green SVG ring, Helvetica/LT
Remark hierarchy, rectangular actions, and relative contact overlay as the landing page. It
scrolls because it is a substantial reading object; congruence comes from the visual system,
not by forcing the home page's one-screen behaviour onto the essay.

**Image bands on the practice map.** One full plate at the top, unfiltered; after that the
photographs run as thin desaturated "spectral rules" between territories, so the colour
paces the page instead of shouting over a cream-and-forest palette. Deliberate — see the
comment above `.band` before enlarging them.

## Open threads

- **The practice map wants restructuring.** A reader's note: it calls itself a map and reads
  as a linear essay, so the relationships between body/heart/mind × cultivate/rest/reveals
  are never actually shown. Proposal under consideration: a real grid near the top, the
  "if overwhelmed / if angry / if scattered" entry points moved up with it, nothing cut.
  This page is the cheapest place to prototype it — it is hand-maintained.

## The home page

`index.html` is one unscrollable landing page with four supporting information sheets:
recognition, practice, John, and money. Keep the landing visible behind the sheets.

**The entry gate** is one clean SVG ring with no instructional copy or interaction. It is shut
by default in CSS and opened by the early `<head>` script on the first visit in a session.
The ring breathes once over 2.2 seconds, then automatically moves into and dissolves through the hero's green-
and-gold field while the landing interface fades in. `sessionStorage["stb-entered"]` is written
when that handoff begins, so the short ident appears only once per browsing session.

**The ring is SVG, not `images/logo.png`.** Keep this loading ident simple: one stroked circle,
one breath, one move into light. It respects reduced-motion preferences and should not regain
orbiting elements, metaballs, prompts, or a click-to-enter state.

The old scrolling page is in git history if any of this needs walking back:
`git log --oneline -- index.html`.
