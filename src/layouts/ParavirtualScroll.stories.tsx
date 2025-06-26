import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ParavirtualScroll } from "./ParavirtualScroll";

const meta = {
  title: "layouts/ParavirtualScroll",
  component: ParavirtualScroll,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ParavirtualScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    content: `Item ${i + 1}`,
    size: Math.floor(Math.random() * 100) + 50,
  }));
};

export const VerticalScroll: Story = {
  args: {
    children: null,
  },
  render: () => {
    const items = generateItems(1000);
    return (
      <div style={{ height: "400px", overflow: "auto", border: "1px solid #ccc" }}>
        <ParavirtualScroll direction="vertical">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                height: item.size,
                background: item.id % 2 === 0 ? "#f5f5f5" : "#fff",
              }}
            >
              {item.content} (height: {item.size}px)
            </div>
          ))}
        </ParavirtualScroll>
      </div>
    );
  },
};

export const HorizontalScroll: Story = {
  args: {
    children: null,
  },
  render: () => {
    const items = generateItems(500);
    return (
      <div style={{ width: "600px", height: "200px", overflow: "auto", border: "1px solid #ccc" }}>
        <ParavirtualScroll direction="horizontal">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                borderRight: "1px solid #eee",
                width: item.size * 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: item.id % 2 === 0 ? "#f5f5f5" : "#fff",
                flexShrink: 0,
              }}
            >
              {item.content}
              <br />
              (width: {item.size * 2}px)
            </div>
          ))}
        </ParavirtualScroll>
      </div>
    );
  },
};

export const WindowScroll: Story = {
  args: {
    children: null,
  },
  render: () => {
    const items = generateItems(2000);
    return (
      <ParavirtualScroll direction="vertical">
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              height: item.size,
              background: item.id % 2 === 0 ? "#f5f5f5" : "#fff",
            }}
          >
            {item.content} (height: {item.size}px)
          </div>
        ))}
      </ParavirtualScroll>
    );
  },
};

export const ChunkedVertical: Story = {
  args: {
    children: null,
  },
  render: () => {
    const items = generateItems(1000);
    return (
      <div style={{ height: "400px", overflow: "auto", border: "1px solid #ccc" }}>
        <ParavirtualScroll direction="vertical" chunkSize={12}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                height: item.size,
                background: item.id % 2 === 0 ? "#f5f5f5" : "#fff",
              }}
            >
              {item.content} (height: {item.size}px) - Chunk of 12 items
            </div>
          ))}
        </ParavirtualScroll>
      </div>
    );
  },
};

export const ChunkedHorizontal: Story = {
  args: {
    children: null,
  },
  render: () => {
    const items = generateItems(500);
    return (
      <div style={{ width: "600px", height: "200px", overflow: "auto", border: "1px solid #ccc" }}>
        <ParavirtualScroll direction="horizontal" chunkSize={8}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "10px",
                borderRight: "1px solid #eee",
                width: item.size * 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: item.id % 2 === 0 ? "#f5f5f5" : "#fff",
                flexShrink: 0,
              }}
            >
              {item.content}
              <br />
              (chunk of 8)
            </div>
          ))}
        </ParavirtualScroll>
      </div>
    );
  },
};

export const MixedContent: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <div style={{ height: "400px", overflow: "auto", border: "1px solid #ccc" }}>
        <ParavirtualScroll chunkSize={5}>
          {Array.from({ length: 200 }, (_, i) => {
            if (i % 5 === 0) {
              return (
                <div
                  key={i}
                  style={{
                    padding: "20px",
                    background: "#e3f2fd",
                    borderBottom: "2px solid #1976d2",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Section {Math.floor(i / 5) + 1}</h3>
                  <p style={{ margin: "10px 0 0 0" }}>This is a section header with dynamic content. (Chunked by 5)</p>
                </div>
              );
            }
            return (
              <div
                key={i}
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  background: i % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <strong>Item {i + 1}</strong>
                <p style={{ margin: "5px 0 0 0", color: "#666" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Part of chunk)
                </p>
              </div>
            );
          })}
        </ParavirtualScroll>
      </div>
    );
  },
};
