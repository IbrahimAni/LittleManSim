import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Accumulator from "../components/Simulator/Accumulator";
import ProgramCounter from "../components/Simulator/ProgramCounter";
import Controls from "../components/Controls/Controls";
import Mailbox from "../components/Mailbox/Mailbox";
import CodeEditor from "../components/Editor/CodeEditor";
import Output from "../components/Output";
import Input from "../components/Input";
import InstructionLoader from "../components/InstructionLoader";
import LogInfo from "../components/LogInfo";

const Simulator = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 h-full">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr_1.5fr] lg:gap-8 h-full">
          {/* Left Column: Code Editor */}
          <div className="grid grid-cols-1 gap-4 h-full">
            <section
              aria-labelledby="section-code-editor-title"
              className="h-full"
            >
              <div className="rounded-lg bg-white shadow h-full">
                <div className="p-6 h-full flex flex-col">
                  <CodeEditor />
                  <InstructionLoader />
                </div>
              </div>
            </section>
          </div>

          {/* Middle Column: Simulator Components */}
          <div className="grid grid-cols-1 gap-4 h-full">
            <section
              aria-labelledby="section-simulator-components-title"
              className="h-full"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow h-full">
                <div className="p-6 h-full flex flex-col">
                  {/* Components arranged in a vertical stack */}
                  <div className="flex-1 grid grid-cols-1 gap-4">
                    <Output />
                    <ProgramCounter />
                    <Accumulator />
                    <Input />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: RAM Placeholder */}
          <div className="grid grid-cols-1 gap-4 h-full">
            <section
              aria-labelledby="section-simulator-components-title"
              className="h-full"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow h-full">
                <div className="p-6 h-full flex flex-col">
                  <Mailbox />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Log Information section */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2 mt-4 h-full">
          <section aria-labelledby="section-log-info-title">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6 pt-1 h-full flex flex-col">
                <LogInfo />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Simulator;
