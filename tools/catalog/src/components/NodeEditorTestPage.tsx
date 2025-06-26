import React, { useState } from "react";
import { NodeEditor } from "tanuki-ui/extended/node-editor";
import type { NodeEditorData, NodeDefinition, NodeRenderProps, InspectorRenderProps } from "tanuki-ui/extended/node-editor";
import { H1, H2, H3, P, Section, Article, Button, Label, Input, Select } from "tanuki-ui";

// カスタムノードレンダラー
const MathNodeRenderer = ({ node, isSelected, onUpdateNode }: NodeRenderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const value = node.data.value as number || 0;
  const operation = node.data.operation as string || '+';
  
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: `2px solid ${isSelected ? '#007bff' : '#28a745'}`,
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2e7d32' }}>
        {node.data.title || node.type}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', color: '#1b5e20' }}>
          {operation === 'add' ? '➕' : operation === 'multiply' ? '✖️' : operation === 'divide' ? '➗' : '🔢'}
        </span>
      </div>
      {isEditing ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onUpdateNode({ data: { ...node.data, value: Number(e.target.value) } })}
          onBlur={() => setIsEditing(false)}
          style={{ fontSize: '10px', width: '100%' }}
          autoFocus
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{ fontSize: '10px', textAlign: 'center', cursor: 'pointer' }}
        >
          Result: {value}
        </div>
      )}
    </div>
  );
};

const DataSourceRenderer = ({ node, isSelected, onUpdateNode }: NodeRenderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const value = node.data.value as number || 0;
  
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: `2px solid ${isSelected ? '#007bff' : '#17a2b8'}`,
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #e3f2fd, #b3e5fc)',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0277bd' }}>
        📊 {node.data.title || 'Data Source'}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isEditing ? (
          <input
            type="number"
            value={value}
            onChange={(e) => onUpdateNode({ data: { ...node.data, value: Number(e.target.value) } })}
            onBlur={() => setIsEditing(false)}
            style={{ fontSize: '14px', width: '80%', textAlign: 'center' }}
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#01579b',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

const DisplayNodeRenderer = ({ node }: NodeRenderProps) => {
  const text = node.data.text as string || 'No data';
  const value = node.data.value as number;
  const isNumberDisplay = node.type === 'number-display';
  
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid #6c757d',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#495057' }}>
        📺 {node.data.title || 'Display'}
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        margin: '4px 0',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#212529',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          {isNumberDisplay ? (value !== undefined ? value : 'N/A') : text}
        </div>
      </div>
    </div>
  );
};

// カスタムインスペクターパネル
const MathNodeInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const operation = node.data.operation as string || 'add';
  const precision = node.data.precision as number || 2;
  
  return (
    <div style={{ padding: '16px' }}>
      <H3>Math Node Settings</H3>
      
      <div style={{ marginBottom: '12px' }}>
        <Label>Operation Type:</Label>
        <Select
          value={operation}
          onChange={(e) => onUpdateNode({ data: { ...node.data, operation: e.target.value } })}
          style={{ width: '100%', marginTop: '4px' }}
        >
          <option value="add">Addition (+)</option>
          <option value="multiply">Multiplication (×)</option>
          <option value="divide">Division (÷)</option>
        </Select>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <Label>Decimal Precision:</Label>
        <Input
          type="number"
          value={precision}
          onChange={(e) => onUpdateNode({ data: { ...node.data, precision: Number(e.target.value) } })}
          min={0}
          max={10}
          style={{ width: '100%', marginTop: '4px' }}
        />
      </div>
      
      <div>
        <Label>Node Title:</Label>
        <Input
          type="text"
          value={node.data.title as string || ''}
          onChange={(e) => onUpdateNode({ data: { ...node.data, title: e.target.value } })}
          placeholder="Enter title..."
          style={{ width: '100%', marginTop: '4px' }}
        />
      </div>
    </div>
  );
};

const DataSourceInspector = ({ node, onUpdateNode }: InspectorRenderProps) => {
  const value = node.data.value as number || 0;
  const min = node.data.min as number || 0;
  const max = node.data.max as number || 100;
  const step = node.data.step as number || 1;
  
  return (
    <div style={{ padding: '16px' }}>
      <H3>Data Source Settings</H3>
      
      <div style={{ marginBottom: '12px' }}>
        <Label>Current Value:</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => onUpdateNode({ data: { ...node.data, value: Number(e.target.value) } })}
          style={{ width: '100%', marginTop: '4px' }}
        />
      </div>
      
      {node.type === 'random-generator' && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <Label>Minimum Value:</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => onUpdateNode({ data: { ...node.data, min: Number(e.target.value) } })}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <Label>Maximum Value:</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => onUpdateNode({ data: { ...node.data, max: Number(e.target.value) } })}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>
          
          <Button
            onClick={() => {
              const newValue = Math.random() * (max - min) + min;
              onUpdateNode({ data: { ...node.data, value: Math.round(newValue * 100) / 100 } });
            }}
            style={{ width: '100%', marginTop: '8px' }}
          >
            🎲 Generate Random
          </Button>
        </>
      )}
      
      <div style={{ marginTop: '12px' }}>
        <Label>Title:</Label>
        <Input
          type="text"
          value={node.data.title as string || ''}
          onChange={(e) => onUpdateNode({ data: { ...node.data, title: e.target.value } })}
          placeholder="Enter title..."
          style={{ width: '100%', marginTop: '4px' }}
        />
      </div>
    </div>
  );
};

// Extended node definitions with custom nodes
const basicNodeDefinitions: NodeDefinition[] = [
  // Math Operations with custom renderers
  {
    type: "math-add",
    displayName: "Add",
    description: "Adds two numbers together",
    category: "Math",
    icon: "➕",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Add", result: 0, operation: "add", precision: 2 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathNodeInspector,
  },
  {
    type: "math-multiply",
    displayName: "Multiply",
    description: "Multiplies two numbers",
    category: "Math",
    icon: "✖️",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Multiply", result: 0, operation: "multiply", precision: 2 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathNodeInspector,
  },
  {
    type: "math-divide",
    displayName: "Divide",
    description: "Divides first number by second",
    category: "Math",
    icon: "➗",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Divide", result: 0, operation: "divide", precision: 2 },
    ports: [
      { id: "dividend", type: "input", label: "Dividend", position: "left", dataType: "number" },
      { id: "divisor", type: "input", label: "Divisor", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathNodeInspector,
  },
  
  // Data Sources with custom renderers
  {
    type: "data-source",
    displayName: "Number Source",
    description: "Provides numeric data input",
    category: "Data",
    icon: "📊",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Number Source", value: 42 },
    ports: [{ id: "output", type: "output", label: "Value", position: "right", dataType: "number" }],
    renderNode: DataSourceRenderer,
    renderInspector: DataSourceInspector,
  },
  {
    type: "string-source",
    displayName: "String Source",
    description: "Provides text data input",
    category: "Data",
    icon: "📝",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "String Source", value: "Hello" },
    ports: [{ id: "output", type: "output", label: "Text", position: "right", dataType: "string" }],
  },
  {
    type: "random-generator",
    displayName: "Random Number",
    description: "Generates random numbers",
    category: "Data",
    icon: "🎲",
    defaultSize: { width: 180, height: 100 },
    defaultData: { title: "Random", min: 0, max: 100, value: 50 },
    ports: [
      { id: "min", type: "input", label: "Min", position: "left", dataType: "number" },
      { id: "max", type: "input", label: "Max", position: "left", dataType: "number" },
      { id: "output", type: "output", label: "Random", position: "right", dataType: "number" },
    ],
    renderNode: DataSourceRenderer,
    renderInspector: DataSourceInspector,
  },
  
  // Display and Output with custom renderers
  {
    type: "text-display",
    displayName: "Text Display",
    description: "Displays text output",
    category: "Display",
    icon: "📺",
    defaultSize: { width: 160, height: 90 },
    defaultData: { title: "Display", text: "Hello World" },
    ports: [{ id: "input", type: "input", label: "Text", position: "left", dataType: "string" }],
    renderNode: DisplayNodeRenderer,
  },
  {
    type: "number-display",
    displayName: "Number Display",
    description: "Displays numeric output",
    category: "Display",
    icon: "🔢",
    defaultSize: { width: 160, height: 90 },
    defaultData: { title: "Number", value: 0 },
    ports: [{ id: "input", type: "input", label: "Number", position: "left", dataType: "number" }],
    renderNode: DisplayNodeRenderer,
  },
  {
    type: "chart-display",
    displayName: "Chart Display",
    description: "Displays data as a simple chart",
    category: "Display",
    icon: "📈",
    defaultSize: { width: 200, height: 120 },
    defaultData: { title: "Chart", data: [] },
    ports: [
      { id: "value", type: "input", label: "Value", position: "left", dataType: "number" },
      { id: "label", type: "input", label: "Label", position: "left", dataType: "string" },
    ],
  },
  
  // Logic and Control
  {
    type: "condition",
    displayName: "Condition",
    description: "Conditional logic node",
    category: "Logic",
    icon: "❓",
    defaultSize: { width: 180, height: 120 },
    defaultData: { title: "If-Then", condition: "greater" },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "true", type: "output", label: "True", position: "right", dataType: "any" },
      { id: "false", type: "output", label: "False", position: "right", dataType: "any" },
    ],
  },
  {
    type: "timer",
    displayName: "Timer",
    description: "Triggers output at intervals",
    category: "Control",
    icon: "⏰",
    defaultSize: { width: 160, height: 100 },
    defaultData: { title: "Timer", interval: 1000, active: false },
    ports: [
      { id: "start", type: "input", label: "Start", position: "left", dataType: "boolean" },
      { id: "interval", type: "input", label: "Interval", position: "left", dataType: "number" },
      { id: "tick", type: "output", label: "Tick", position: "right", dataType: "number" },
    ],
  },
  
  // String Operations
  {
    type: "string-concat",
    displayName: "Concatenate",
    description: "Joins two strings together",
    category: "String",
    icon: "🔗",
    defaultSize: { width: 170, height: 90 },
    defaultData: { title: "Concat", separator: "" },
    ports: [
      { id: "a", type: "input", label: "String A", position: "left", dataType: "string" },
      { id: "b", type: "input", label: "String B", position: "left", dataType: "string" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "string" },
    ],
  },
  {
    type: "number-to-string",
    displayName: "Number→String",
    description: "Converts number to string",
    category: "Converter",
    icon: "🔄",
    defaultSize: { width: 160, height: 80 },
    defaultData: { title: "Num→Str" },
    ports: [
      { id: "input", type: "input", label: "Number", position: "left", dataType: "number" },
      { id: "output", type: "output", label: "String", position: "right", dataType: "string" },
    ],
  },
];

// Test data sets
const testDataSets: Record<string, NodeEditorData> = {
  simple: {
    nodes: {
      "node1": {
        id: "node1",
        type: "data-source",
        position: { x: 100, y: 200 },
        size: { width: 180, height: 100 },
        data: { title: "Simple Source", value: 42 },
      },
    },
    connections: {},
  },
  mathFlow: {
    nodes: {
      "input1": {
        id: "input1",
        type: "data-source",
        position: { x: 50, y: 100 },
        size: { width: 180, height: 100 },
        data: { title: "Input A", value: 10 },
      },
      "input2": {
        id: "input2",
        type: "data-source",
        position: { x: 50, y: 250 },
        size: { width: 180, height: 100 },
        data: { title: "Input B", value: 5 },
      },
      "add": {
        id: "add",
        type: "math-add",
        position: { x: 350, y: 175 },
        size: { width: 150, height: 80 },
        data: { title: "Add Operation", result: 0, operation: "add", precision: 2 },
      },
      "multiply": {
        id: "multiply",
        type: "math-multiply",
        position: { x: 600, y: 100 },
        size: { width: 150, height: 80 },
        data: { title: "Multiply by 2", result: 0, operation: "multiply", precision: 2 },
      },
      "multiplier": {
        id: "multiplier",
        type: "data-source",
        position: { x: 350, y: 50 },
        size: { width: 180, height: 100 },
        data: { title: "Multiplier", value: 2 },
      },
      "converter": {
        id: "converter",
        type: "number-to-string",
        position: { x: 850, y: 175 },
        size: { width: 160, height: 80 },
        data: { title: "Num→Str" },
      },
      "display": {
        id: "display",
        type: "text-display",
        position: { x: 1100, y: 175 },
        size: { width: 160, height: 90 },
        data: { title: "Final Result", text: "30" },
      },
      "numberDisplay": {
        id: "numberDisplay",
        type: "number-display",
        position: { x: 600, y: 250 },
        size: { width: 160, height: 90 },
        data: { title: "Sum", value: 15 },
      },
    },
    connections: {
      "conn1": {
        id: "conn1",
        fromNodeId: "input1",
        fromPortId: "output",
        toNodeId: "add",
        toPortId: "a",
      },
      "conn2": {
        id: "conn2",
        fromNodeId: "input2",
        fromPortId: "output",
        toNodeId: "add",
        toPortId: "b",
      },
      "conn3": {
        id: "conn3",
        fromNodeId: "add",
        fromPortId: "result",
        toNodeId: "multiply",
        toPortId: "a",
      },
      "conn4": {
        id: "conn4",
        fromNodeId: "multiplier",
        fromPortId: "output",
        toNodeId: "multiply",
        toPortId: "b",
      },
      "conn5": {
        id: "conn5",
        fromNodeId: "multiply",
        fromPortId: "result",
        toNodeId: "converter",
        toPortId: "input",
      },
      "conn6": {
        id: "conn6",
        fromNodeId: "converter",
        fromPortId: "output",
        toNodeId: "display",
        toPortId: "input",
      },
      "conn7": {
        id: "conn7",
        fromNodeId: "add",
        fromPortId: "result",
        toNodeId: "numberDisplay",
        toPortId: "input",
      },
    },
  },
  empty: {
    nodes: {},
    connections: {},
  },
  
  complexFlow: {
    nodes: {
      "rand1": {
        id: "rand1",
        type: "random-generator",
        position: { x: 50, y: 100 },
        size: { width: 180, height: 100 },
        data: { title: "Random A", min: 1, max: 50, value: 25 },
      },
      "rand2": {
        id: "rand2",
        type: "random-generator",
        position: { x: 50, y: 250 },
        size: { width: 180, height: 100 },
        data: { title: "Random B", min: 1, max: 50, value: 35 },
      },
      "condition": {
        id: "condition",
        type: "condition",
        position: { x: 350, y: 175 },
        size: { width: 180, height: 120 },
        data: { title: "A > B?", condition: "greater" },
      },
      "winner": {
        id: "winner",
        type: "string-source",
        position: { x: 600, y: 100 },
        size: { width: 180, height: 100 },
        data: { title: "Winner Text", value: "A Wins!" },
      },
      "loser": {
        id: "loser",
        type: "string-source",
        position: { x: 600, y: 250 },
        size: { width: 180, height: 100 },
        data: { title: "Loser Text", value: "B Wins!" },
      },
      "result": {
        id: "result",
        type: "text-display",
        position: { x: 850, y: 175 },
        size: { width: 160, height: 90 },
        data: { title: "Result", text: "Click to compare!" },
      },
      "chart": {
        id: "chart",
        type: "chart-display",
        position: { x: 350, y: 350 },
        size: { width: 200, height: 120 },
        data: { title: "Comparison", data: [] },
      },
    },
    connections: {
      "conn1": {
        id: "conn1",
        fromNodeId: "rand1",
        fromPortId: "output",
        toNodeId: "condition",
        toPortId: "a",
      },
      "conn2": {
        id: "conn2",
        fromNodeId: "rand2",
        fromPortId: "output",
        toNodeId: "condition",
        toPortId: "b",
      },
      "conn3": {
        id: "conn3",
        fromNodeId: "condition",
        fromPortId: "true",
        toNodeId: "result",
        toPortId: "input",
      },
      "conn4": {
        id: "conn4",
        fromNodeId: "condition",
        fromPortId: "false",
        toNodeId: "result",
        toPortId: "input",
      },
      "conn5": {
        id: "conn5",
        fromNodeId: "rand1",
        fromPortId: "output",
        toNodeId: "chart",
        toPortId: "value",
      },
    },
  },
} as const;

const NodeEditorTestPage: React.FC = () => {
  const [uncontrolledData, setUncontrolledData] = useState<NodeEditorData>(testDataSets.simple);
  const [controlledData, setControlledData] = useState<NodeEditorData>(testDataSets.mathFlow);
  const [isControlledMode, setIsControlledMode] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState<keyof typeof testDataSets>("simple");

  const handleLoadTestData = (dataKey: keyof typeof testDataSets) => {
    setSelectedTestData(dataKey);
    if (isControlledMode) {
      setControlledData(testDataSets[dataKey]);
    } else {
      // Uncontrolled mode: we need to remount the component to change initialData
      setUncontrolledData(testDataSets[dataKey]);
    }
  };

  const handleModeChange = (controlled: boolean) => {
    setIsControlledMode(controlled);
    // Sync data when switching modes
    if (controlled) {
      setControlledData(uncontrolledData);
    } else {
      setUncontrolledData(controlledData);
    }
  };

  return (
    <Article style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <H1>🧪 NodeEditor Props テストページ</H1>
      <P>
        このページでは、NodeEditorコンポーネントの新しいprops API（initialData vs data）をテストできます。
      </P>

      <Section style={{ marginBottom: "24px" }}>
        <H2>⚙️ テスト設定</H2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "auto 1fr", 
          gap: "16px", 
          alignItems: "center",
          marginBottom: "16px",
          padding: "16px",
          background: "#f8f9fa",
          borderRadius: "8px",
        }}>
          <Label style={{ fontWeight: "bold" }}>
            モード:
          </Label>
          <div>
            <Label style={{ marginRight: "16px" }}>
              <input
                type="radio"
                name="mode"
                checked={!isControlledMode}
                onChange={() => handleModeChange(false)}
                style={{ marginRight: "8px" }}
              />
              Uncontrolled (initialData)
            </Label>
            <Label>
              <input
                type="radio"
                name="mode"
                checked={isControlledMode}
                onChange={() => handleModeChange(true)}
                style={{ marginRight: "8px" }}
              />
              Controlled (data)
            </Label>
          </div>

          <Label style={{ fontWeight: "bold" }}>
            テストデータ:
          </Label>
          <div style={{ display: "flex", gap: "8px" }}>
            {Object.keys(testDataSets).map((key) => (
              <Button
                key={key}
                onClick={() => handleLoadTestData(key as keyof typeof testDataSets)}
                style={{
                  fontSize: "12px",
                  padding: "6px 12px",
                  backgroundColor: selectedTestData === key ? "#007bff" : "#e9ecef",
                  color: selectedTestData === key ? "white" : "#495057",
                }}
              >
                {key === "simple" ? "シンプル" : key === "mathFlow" ? "計算フロー" : "空"}
              </Button>
            ))}
          </div>
        </div>

        <div style={{
          padding: "12px",
          background: isControlledMode ? "#e3f2fd" : "#e8f5e9",
          borderRadius: "6px",
          fontSize: "14px",
        }}>
          <strong>現在のモード:</strong> {isControlledMode ? "Controlled" : "Uncontrolled"}
          <br />
          <strong>動作:</strong> {isControlledMode 
            ? "親コンポーネントがdata propで状態を管理。データボタンで即座に切り替わります。"
            : "コンポーネントがinitialDataを初期値として内部で状態を管理。データボタンは次回マウント時に適用されます。"
          }
        </div>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H2>🎛️ NodeEditor</H2>
        
        <div
          style={{
            width: "100%",
            height: "600px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {isControlledMode ? (
            <NodeEditor
              key="controlled"
              initialData={controlledData}
              onDataChange={setControlledData}
              nodeDefinitions={basicNodeDefinitions}
              showInspector={true}
            />
          ) : (
            <NodeEditor
              key={`uncontrolled-${selectedTestData}`} // Force remount when test data changes
              initialData={uncontrolledData}
              onDataChange={setUncontrolledData}
              nodeDefinitions={basicNodeDefinitions}
              showInspector={true}
            />
          )}
        </div>
      </Section>

      <Section style={{ marginBottom: "24px" }}>
        <H2>📊 状態デバッグ</H2>
        
        <div style={{ marginBottom: "16px", padding: "12px", background: "#f0f8ff", borderRadius: "6px" }}>
          <strong>🔍 接続状況:</strong> {isControlledMode ? Object.keys(controlledData.connections).length : Object.keys(uncontrolledData.connections).length} 個の接続
          {selectedTestData === "mathFlow" && (
            <div style={{ marginTop: "8px", fontSize: "12px" }}>
              <strong>Math Flow 接続:</strong> input1→add, input2→add, add→multiply, add→numberDisplay, multiplier→multiply, multiply→converter, converter→display
            </div>
          )}
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <H3 style={{ fontSize: "16px" }}>Uncontrolled State</H3>
            <pre style={{
              background: "#f8f9fa",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "12px",
              overflow: "auto",
              maxHeight: "200px",
            }}>
              {JSON.stringify(uncontrolledData, null, 2)}
            </pre>
          </div>
          
          <div>
            <H3 style={{ fontSize: "16px" }}>Controlled State</H3>
            <pre style={{
              background: "#f8f9fa",
              padding: "12px",
              borderRadius: "6px",
              fontSize: "12px",
              overflow: "auto",
              maxHeight: "200px",
            }}>
              {JSON.stringify(controlledData, null, 2)}
            </pre>
          </div>
        </div>
      </Section>

      <Section>
        <H2>🎯 テスト手順</H2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <H3 style={{ fontSize: "16px", color: "#28a745" }}>Uncontrolled Mode</H3>
            <ol style={{ fontSize: "14px" }}>
              <li>「Uncontrolled (initialData)」を選択</li>
              <li>エディター内でノードを追加・移動・接続</li>
              <li>「テストデータ」ボタンを押しても即座には変わらない</li>
              <li>状態はコンポーネント内部で管理される</li>
            </ol>
          </div>
          
          <div>
            <H3 style={{ fontSize: "16px", color: "#007bff" }}>Controlled Mode</H3>
            <ol style={{ fontSize: "14px" }}>
              <li>「Controlled (data)」を選択</li>
              <li>「テストデータ」ボタンで即座にエディターが更新される</li>
              <li>エディター内で変更すると右側の状態も更新される</li>
              <li>親コンポーネントが完全に状態を制御</li>
            </ol>
          </div>
        </div>
      </Section>
    </Article>
  );
};

export default NodeEditorTestPage;