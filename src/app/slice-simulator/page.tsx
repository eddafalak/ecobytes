import { Suspense } from "react";
import { SliceSimulator, getSlices, type SliceSimulatorParams } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

// Used by Slice Machine to preview slices while you build them (npm run slicemachine).
export default function SliceSimulatorPage({ searchParams }: SliceSimulatorParams) {
  return (
    <Suspense>
      <Simulated searchParams={searchParams} />
    </Suspense>
  );
}

async function Simulated({ searchParams }: SliceSimulatorParams) {
  const { state } = await searchParams;
  return (
    <SliceSimulator>
      <div className="mx-auto max-w-3xl px-5">
        <SliceZone slices={getSlices(state)} components={components} />
      </div>
    </SliceSimulator>
  );
}
