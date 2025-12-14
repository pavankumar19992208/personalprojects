import { useState } from "react";
import {
  Plug,
  Cable,
  ArrowRight,
  Coffee,
  Plus,
  Layers,
  Box,
} from "lucide-react";

export const AdapterVisual = () => {
  const [connected, setConnected] = useState(false);

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Plug className="w-5 h-5 text-orange-500" />
        The Adapter Pattern: Translation
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        {/* Legacy System */}
        <div className="flex flex-col items-center gap-2 p-4 bg-red-50 rounded-lg border border-red-100 w-full md:w-1/3">
          <div className="font-mono text-xs text-red-600 mb-1">
            Legacy System (XML)
          </div>
          <Box className="w-10 h-10 text-red-500" />
          <code className="text-xs bg-white p-1 rounded border border-red-100 text-red-700">
            &lt;stock&gt;50&lt;/stock&gt;
          </code>
        </div>

        {/* The Adapter */}
        <div className="flex flex-col items-center gap-2 relative w-full md:w-1/3">
          <ArrowRight
            className={`w-6 h-6 text-slate-300 absolute top-1/2 -left-3 -translate-y-1/2 hidden md:block`}
          />

          <button
            onClick={() => setConnected(!connected)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 w-full
              ${
                connected
                  ? "bg-orange-50 border-orange-400 shadow-md"
                  : "bg-slate-50 border-dashed border-slate-300 hover:border-orange-300"
              }
            `}
          >
            <div className="font-bold text-sm text-slate-700">
              {connected ? "Adapter Active" : "Click to Connect Adapter"}
            </div>
            <Cable
              className={`w-8 h-8 ${
                connected ? "text-orange-500" : "text-slate-400"
              }`}
            />
            {connected && (
              <div className="text-xs text-orange-600 font-mono text-center">
                Parsing XML...
                <br />
                Converting to JSON...
              </div>
            )}
          </button>

          <ArrowRight
            className={`w-6 h-6 text-slate-300 absolute top-1/2 -right-3 -translate-y-1/2 hidden md:block`}
          />
        </div>

        {/* New System */}
        <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-100 w-full md:w-1/3">
          <div className="font-mono text-xs text-green-600 mb-1">
            Client (JSON)
          </div>
          <div
            className={`transition-opacity duration-500 ${
              connected ? "opacity-100" : "opacity-30"
            }`}
          >
            <code className="text-xs bg-white p-2 rounded border border-green-100 text-green-700 block">
              {`{ "stock": 50 }`}
            </code>
          </div>
          {!connected && (
            <div className="text-xs text-slate-400 italic">
              Waiting for data...
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-slate-600 mt-4 text-center">
        The Client expects JSON. The Legacy system gives XML. The{" "}
        <strong>Adapter</strong> sits in the middle and translates.
      </p>
    </div>
  );
};

export const DecoratorVisual = () => {
  const [layers, setLayers] = useState<string[]>([]);

  const addLayer = (layer: string) => {
    if (layers.includes(layer)) {
      setLayers(layers.filter((l) => l !== layer));
    } else {
      setLayers([...layers, layer]);
    }
  };

  const basePrice = 5;
  const milkPrice = 2;
  const sugarPrice = 1;

  const totalPrice =
    basePrice +
    (layers.includes("milk") ? milkPrice : 0) +
    (layers.includes("sugar") ? sugarPrice : 0);

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-purple-500" />
        The Decorator Pattern: Wrappers
      </h3>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-3 w-full md:w-1/3">
          <div className="text-sm font-medium text-slate-700 mb-2">
            Build your object:
          </div>

          <div className="p-3 bg-white rounded border border-slate-200 flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-700" /> Base Coffee
            </span>
            <span className="font-mono text-slate-500">${basePrice}</span>
          </div>

          <button
            onClick={() => addLayer("milk")}
            className={`p-3 rounded border flex justify-between items-center transition-colors ${
              layers.includes("milk")
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Plus className="w-3 h-3" /> Add Milk Wrapper
            </span>
            <span className="font-mono text-slate-500">+${milkPrice}</span>
          </button>

          <button
            onClick={() => addLayer("sugar")}
            className={`p-3 rounded border flex justify-between items-center transition-colors ${
              layers.includes("sugar")
                ? "bg-pink-50 border-pink-300 text-pink-700"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Plus className="w-3 h-3" /> Add Sugar Wrapper
            </span>
            <span className="font-mono text-slate-500">+${sugarPrice}</span>
          </button>

          <div className="mt-4 p-3 bg-slate-800 text-white rounded-lg flex justify-between items-center">
            <span className="font-bold">Total Cost:</span>
            <span className="font-mono text-xl">${totalPrice}</span>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="flex-1 flex items-center justify-center bg-white rounded-lg border border-slate-100 p-8 min-h-[200px]">
          <div className="relative flex items-center justify-center">
            {/* Base Object */}
            <div className="z-30 w-24 h-24 bg-amber-100 rounded-full flex flex-col items-center justify-center border-4 border-amber-200 shadow-sm">
              <Coffee className="w-8 h-8 text-amber-700 mb-1" />
              <span className="text-xs font-bold text-amber-800">Coffee</span>
            </div>

            {/* Milk Wrapper */}
            {layers.includes("milk") && (
              <div className="absolute z-20 w-36 h-36 border-4 border-blue-200 rounded-full flex items-start justify-center pt-2 animate-in fade-in zoom-in duration-300">
                <span className="text-xs font-bold text-blue-400 bg-white px-2 -mt-3">
                  Milk Wrapper
                </span>
              </div>
            )}

            {/* Sugar Wrapper */}
            {layers.includes("sugar") && (
              <div
                className={`absolute z-10 border-4 border-pink-200 rounded-full flex items-start justify-center pt-2 animate-in fade-in zoom-in duration-300 ${
                  layers.includes("milk") ? "w-48 h-48" : "w-36 h-36"
                }`}
              >
                <span className="text-xs font-bold text-pink-400 bg-white px-2 -mt-3">
                  Sugar Wrapper
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 mt-4">
        The <code>cost()</code> call goes from the outer wrapper (Sugar) &rarr;
        inner wrapper (Milk) &rarr; base object (Coffee), accumulating results
        on the way back.
      </p>
    </div>
  );
};
