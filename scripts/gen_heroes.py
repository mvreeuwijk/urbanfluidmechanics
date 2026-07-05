"""
Generate four thematic hero images for the Urban Fluid Mechanics site.
All are numerically-synthesised "scientific visualisation" fields so the site
reads as one visual family, each with its own vivid palette:

  research  -> turbulent scalar plume advected over a building array
  members   -> a luminous constellation of institutions over a faint flow field
  meetings  -> streaklines / particle pathlines converging (a gathering)
  about     -> the urban atmospheric boundary layer (wind profile + skyline)

Fully deterministic (fixed seeds). Renders at 1920x1080, saves JPG q92.
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from scipy.ndimage import gaussian_filter
from PIL import Image
import os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else "."
os.makedirs(OUT, exist_ok=True)
W, H = 1920, 1080

def cmap(name, stops):
    return LinearSegmentedColormap.from_list(name, stops, N=1024)

# ---- palettes (cool -> warm, all "interesting colour-wise") -----------------
CM_RESEARCH = cmap("research", [
    "#081227", "#0c3550", "#0e6b74", "#17a89b", "#7fceac",
    "#f0dCa6", "#e8a24c", "#d9662f", "#b02f3a"])
CM_MEET = cmap("meet", [
    "#120a20", "#3a1550", "#7a1e73", "#c02f7a", "#ec6a3c", "#f6c85a", "#fdf1c0"])

def spectral(nx, ny, beta, seed, aniso=1.0):
    """Smooth fractal field via power-law spectrum; aniso stretches x-scale."""
    rng = np.random.default_rng(seed)
    kx = np.fft.fftfreq(nx)[:, None] * aniso
    ky = np.fft.fftfreq(ny)[None, :]
    k = np.sqrt(kx**2 + ky**2)
    k[0, 0] = 1.0
    amp = k ** (-beta / 2.0)
    phase = np.exp(2j * np.pi * rng.random((nx, ny)))
    f = np.fft.ifft2(amp * phase).real
    f -= f.min(); f /= (f.max() + 1e-9)
    return f

def save(arr_or_fig, path):
    if isinstance(arr_or_fig, np.ndarray):
        Image.fromarray(arr_or_fig).save(path, quality=92)
    else:
        arr_or_fig.savefig(path, dpi=100, pad_inches=0, quality=92)
        plt.close(arr_or_fig)
    print("wrote", path)

def blank_fig():
    fig = plt.figure(figsize=(W/100, H/100), dpi=100)
    ax = fig.add_axes([0, 0, 1, 1]); ax.set_axis_off()
    ax.set_xlim(0, W); ax.set_ylim(H, 0)  # image coords, y down
    return fig, ax

def vignette(rgb, strength=0.22):
    h, w = rgb.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx - w/2)/(w/2))**2 + ((yy - h/2)/(h/2))**2)
    m = 1 - strength * np.clip(d - 0.5, 0, 1)
    return (rgb * m[..., None]).clip(0, 255).astype(np.uint8)

# =============================================================================
# 1. RESEARCH — turbulent scalar plume advected over a building array
# =============================================================================
def research():
    nx, ny = H, W  # rows=height
    T = spectral(nx, ny, beta=3.1, seed=7, aniso=2.4)      # streaky turbulence
    fine = spectral(nx, ny, beta=2.2, seed=11, aniso=2.0)
    T = 0.7 * T + 0.3 * fine

    y = np.linspace(0, 1, nx)[:, None]      # 0 top .. 1 bottom
    x = np.linspace(0, 1, ny)[None, :]      # 0 left .. 1 right
    # plume grows from a low-left source, lofting and spreading downstream
    src_y = 0.86
    spread = 0.06 + 0.42 * x
    centre = src_y - 0.30 * x                # lofts upward downstream
    env = np.exp(-((y - centre) ** 2) / (2 * spread ** 2))
    env *= np.clip(x * 6, 0, 1)             # ramp in from the source
    strength = np.exp(-((x - 0.02)**2) / 0.02) * np.exp(-((y-src_y)**2)/0.004)
    scalar = 0.14 + 0.9 * env * (0.35 + 0.65 * T) + 0.6 * strength
    scalar = gaussian_filter(scalar, 1.2)
    scalar = np.clip(scalar, 0, 1) ** 0.9

    rgb = (CM_RESEARCH(scalar)[..., :3] * 255)

    # building array along the bottom (dark silhouettes the flow washes over)
    rng = np.random.default_rng(3)
    ground = int(nx * 0.995)
    xpos = 0
    blk = np.array([12, 22, 34], float)
    while xpos < ny:
        bw = rng.integers(38, 82)
        bh = rng.integers(70, 240)
        top = ground - bh
        rgb[top:ground, xpos:xpos+bw] = blk
        # thin bright rim on the upwind (left) edge
        rgb[top:ground, xpos:xpos+2] = blk + 40
        xpos += bw + rng.integers(16, 46)
    rgb = vignette(rgb, 0.20)
    save(rgb.astype(np.uint8), os.path.join(OUT, "hero-research.jpg"))

# =============================================================================
# 2. MEMBERS — constellation of institutions over a faint flow field
# =============================================================================
def members():
    # background: deep vertical gradient + faint spectral haze
    top = np.array([8, 17, 30]); bot = np.array([9, 34, 45])
    g = np.linspace(0, 1, H)[:, None, None]
    bg = (top*(1-g) + bot*g)
    haze = spectral(H, W, beta=3.0, seed=21, aniso=1.6)[..., None]
    bg = bg + haze * np.array([6, 26, 30]) * 0.9
    rgb = bg.repeat(W, axis=1) if bg.shape[1] == 1 else bg
    fig, ax = blank_fig()
    ax.imshow(rgb.clip(0,255).astype(np.uint8), extent=[0, W, H, 0], zorder=0)

    # faint streamlines (the shared 'flow' that connects the community)
    rng = np.random.default_rng(5)
    gx = spectral(120, 210, 3.2, 31); gy = spectral(120, 210, 3.2, 32)
    U = np.gradient(gaussian_filter(gy, 3), axis=1)
    V = -np.gradient(gaussian_filter(gx, 3), axis=0)
    ys, xs = np.mgrid[0:H:H/120, 0:W:W/210][:, :120, :210]
    ax.streamplot(np.linspace(0, W, 210), np.linspace(0, H, 120), U, V,
                  density=2.2, linewidth=0.6, arrowsize=0,
                  color=(0.42, 0.82, 0.82, 0.16))

    # nodes = institutions; blue-noise-ish scatter, glowing, cyan->gold
    N = 46
    pts = []
    tries = 0
    while len(pts) < N and tries < 6000:
        tries += 1
        p = np.array([rng.uniform(0.04, 0.96)*W, rng.uniform(0.08, 0.92)*H])
        if all(np.hypot(*(p-q)) > 92 for q in pts):
            pts.append(p)
    pts = np.array(pts)

    # edges: connect near neighbours
    for i, p in enumerate(pts):
        d = np.hypot(*(pts - p).T); order = np.argsort(d)
        for j in order[1:4]:
            if d[j] < 340:
                ax.plot([p[0], pts[j][0]], [p[1], pts[j][1]],
                        color=(0.55, 0.85, 0.9, 0.20), lw=0.7, zorder=2)

    t = (pts[:, 0]/W + (1 - pts[:, 1]/H)) / 2   # colour by position
    node_cm = cmap("nodes", ["#2fe3d0", "#57c9e8", "#c9d66b", "#f4c14e"])
    cols = node_cm(t)
    sizes = rng.uniform(0.6, 1.0, len(pts))
    for glow, a in [(46, 0.05), (26, 0.10), (13, 0.28)]:
        ax.scatter(pts[:, 0], pts[:, 1], s=glow*sizes*3, c=cols,
                   alpha=a, edgecolors="none", zorder=3)
    ax.scatter(pts[:, 0], pts[:, 1], s=26*sizes, c=cols,
               edgecolors="white", linewidths=0.5, zorder=4)
    fig.savefig(os.path.join(OUT, "hero-members.jpg"), dpi=100, pil_kwargs={"quality": 92})
    plt.close(fig); print("wrote hero-members.jpg")

# =============================================================================
# 3. MEETINGS — streaklines / pathlines converging (people gathering)
# =============================================================================
def meetings():
    fig, ax = blank_fig()
    # dark plum backdrop
    top = np.array([18, 10, 32]); bot = np.array([40, 14, 40])
    g = np.linspace(0, 1, H)[:, None, None]
    bg = (top*(1-g) + bot*g).repeat(W, axis=1).clip(0,255).astype(np.uint8)
    ax.imshow(bg, extent=[0, W, H, 0], zorder=0)

    rng = np.random.default_rng(9)
    # smooth vector field from a streamfunction, with a gentle convergence
    psi = spectral(150, 260, 3.3, 44)
    psi = gaussian_filter(psi, 4)
    U = np.gradient(psi, axis=1); V = -np.gradient(psi, axis=0)
    def vel(x, y):
        xi = np.clip(x/W*259, 0, 259); yi = np.clip(y/H*149, 0, 149)
        u = U[yi.astype(int), xi.astype(int)]
        v = V[yi.astype(int), xi.astype(int)]
        # bias flow toward a focus point (the meeting)
        fx, fy = 0.62*W, 0.44*H
        u = u*90 + (fx - x)*0.02
        v = v*90 + (fy - y)*0.02
        return u, v

    P = 520
    x = rng.uniform(0, W, P); y = rng.uniform(0, H, P)
    age = rng.uniform(0, 1, P)
    tint = cmap("mt", ["#f6c85a", "#ec6a3c", "#c02f7a", "#7a1e73"])
    xs = [x.copy()]; ys = [y.copy()]
    STEPS = 46
    for s in range(STEPS):
        u, v = vel(x, y); sp = np.hypot(u, v) + 1e-6
        x = x + u/sp*7.5; y = y + v/sp*7.5
        xs.append(x.copy()); ys.append(y.copy())
    xs = np.array(xs); ys = np.array(ys)
    for p in range(P):
        c = tint((age[p]))
        ax.plot(xs[:, p], ys[:, p], color=(c[0], c[1], c[2], 0.34),
                lw=rng.uniform(0.5, 1.4), solid_capstyle="round", zorder=2)
    # bright heads
    ax.scatter(xs[-1], ys[-1], s=2.4, c=[tint(a) for a in age], alpha=0.5, zorder=3)
    fig.savefig(os.path.join(OUT, "hero-meetings.jpg"), dpi=100, pil_kwargs={"quality": 92})
    plt.close(fig); print("wrote hero-meetings.jpg")

# =============================================================================
# 4. ABOUT — the urban atmospheric boundary layer (wind profile + skyline)
# =============================================================================
def about():
    # vertical sky gradient: night at top -> teal -> amber horizon
    sky = cmap("sky", ["#0a1230", "#12294e", "#164f63", "#2b8f8a",
                       "#d9a24e", "#e7b866"])
    g = np.linspace(0, 1, H)
    col = (sky(g)[:, :3] * 255)
    rgb = np.repeat(col[:, None, :], W, axis=1)
    # subtle horizontal turbulence banding in the sky
    haze = spectral(H, W, 3.2, 55, aniso=3.0)
    rgb = rgb + (haze[..., None]-0.5) * np.array([18, 22, 26]) * 0.7
    rgb = rgb.clip(0, 255).astype(np.uint8)

    fig, ax = blank_fig()
    ax.imshow(rgb, extent=[0, W, H, 0], zorder=0)

    # horizontal wind streaks: length ~ log-law U(z); thin near ground
    rng = np.random.default_rng(13)
    ground = H*0.80
    z0 = 0.02
    for _ in range(1400):
        yy = rng.uniform(0.02*H, ground)
        zn = (ground - yy) / (ground)            # 0 ground .. 1 top
        U = np.log((zn*30 + z0)/z0) / np.log((30+z0)/z0)  # log profile 0..1
        L = 20 + U * 230 * rng.uniform(0.6, 1.2)
        x0 = rng.uniform(-100, W)
        a = 0.05 + 0.16*U
        ax.plot([x0, x0+L], [yy, yy], color=(0.86, 0.94, 0.96, a),
                lw=rng.uniform(0.4, 1.1), solid_capstyle="round", zorder=2)

    # city skyline silhouette along the horizon
    xpos = 0
    while xpos < W:
        bw = rng.integers(30, 70); bh = rng.integers(40, 190)
        ax.add_patch(plt.Rectangle((xpos, ground-bh), bw, bh+ (H-ground),
                     color=(0.05, 0.09, 0.14), zorder=3))
        xpos += bw + rng.integers(4, 20)
    fig.savefig(os.path.join(OUT, "hero-about.jpg"), dpi=100, pil_kwargs={"quality": 92})
    plt.close(fig); print("wrote hero-about.jpg")

if __name__ == "__main__":
    research(); members(); meetings(); about()
    print("done")
