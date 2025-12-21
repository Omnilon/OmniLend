"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GradientBGProps = {
  className?: string;
};

export function GradientBG({ className }: GradientBGProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let cleanup: (() => void) | undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !window.WebGLRenderingContext) {
      return undefined;
    }

    async function init() {
      const [three] = await Promise.all([import("three")]);

      if (!canvasRef.current) {
        return;
      }

      const renderer = new three.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new three.Scene();
      scene.background = null;

      const camera = new three.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 8;

      const plane = new three.Mesh(
        new three.PlaneGeometry(14, 14, 32, 32),
        new three.MeshStandardMaterial({
          color: new three.Color("#111"),
          roughness: 0.8,
          metalness: 0.2
        })
      );
      scene.add(plane);

      const ambient = new three.AmbientLight("#222", 0.6);
      scene.add(ambient);

      const lightA = new three.PointLight("#F07A8E", 18, 30, 2);
      const lightB = new three.PointLight("#F3C24A", 16, 30, 2);
      const lightC = new three.PointLight("#59D3B2", 6, 30, 2);
      scene.add(lightA, lightB, lightC);

      const resize = () => {
        if (!canvasRef.current) return;
        const { clientWidth, clientHeight } = canvasRef.current;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };

      resize();
      window.addEventListener("resize", resize);

      const start = performance.now();
      const render = () => {
        const elapsed = (performance.now() - start) / 1000;
        lightA.position.set(Math.sin(elapsed) * 6, Math.cos(elapsed * 0.8) * 4, 6);
        lightB.position.set(Math.cos(elapsed * 0.6) * -5, Math.sin(elapsed * 0.7) * 5, 4);
        lightC.position.set(Math.cos(elapsed * 0.4) * 3, Math.sin(elapsed * 0.9) * -3, 5);
        plane.rotation.x = Math.sin(elapsed * 0.05) * 0.2;
        plane.rotation.y = Math.cos(elapsed * 0.05) * 0.2;
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(render);
      };

      animationFrame = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        renderer.dispose();
        plane.geometry.dispose();
      };
    }

    init();

    return () => {
      if (cleanup) cleanup();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_#1f1634,_#050505)]",
        className
      )}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: "var(--grad-1)" }}
      />
    </div>
  );
}
