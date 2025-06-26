# Node Editor Port Migration Guide

## Overview
This guide explains how to migrate from the legacy port system (ports stored on nodes) to the new system (ports inferred from NodeDefinitions).

## Migration Status
- ✅ **Phase 1**: Infrastructure (Complete)
- ✅ **Phase 2**: Component Updates (Complete) 
- ✅ **Phase 3**: Data Migration (Complete)
- 🚧 **Phase 4**: Cleanup (In Progress with Feature Flags)

## Quick Start

### For Users
No action required! The system automatically migrates your data when loading and maintains full backward compatibility.

### For Developers

#### 1. Testing the New System
```typescript
// Enable inferred ports only (requires NodeDefinitionRegistry)
setFeatureFlags({ useInferredPortsOnly: true });

// After setting, reload the page
window.location.reload();
```

#### 2. Using the Migration Tools

**Automatic Migration (Default)**
```typescript
// Data is automatically migrated when loaded
const editor = <NodeEditor onLoad={loadData} />;
```

**Manual Migration**
```typescript
import { migrateNodeData } from './utils/dataMigration';

const result = migrateNodeData(oldData, nodeDefinitionRegistry);
console.log(result.statistics);
```

**UI Migration Dialog**
```typescript
import { DataMigrationDialog } from './components/DataMigrationDialog';

<DataMigrationDialog
  isOpen={true}
  data={nodeEditorData}
  onMigrationComplete={(migratedData) => {
    setNodeEditorData(migratedData);
  }}
/>
```

#### 3. Feature Flags

| Flag | Default | Description |
|------|---------|-------------|
| `useInferredPortsOnly` | `false` | Use only inferred ports (no legacy support) |
| `showMigrationWarnings` | `true` | Show console warnings during migration |
| `autoMigrateOnLoad` | `true` | Automatically migrate old data |
| `saveInNewFormat` | `true` | Save without embedded ports |

## Migration Checklist

### Before Migration
- [ ] Ensure all NodeDefinitions include port configurations
- [ ] Test with sample data
- [ ] Back up existing data

### During Migration
- [ ] Enable `showMigrationWarnings` to monitor the process
- [ ] Use the migration dialog for user-initiated migrations
- [ ] Monitor console for any warnings

### After Migration
- [ ] Verify all connections work correctly
- [ ] Test save/load functionality
- [ ] Enable `useInferredPortsOnly` for testing

## API Changes

### Deprecated
```typescript
// Direct port access
const ports = node.ports; // ⚠️ Deprecated
```

### Recommended
```typescript
// Use context methods
const { getNodePorts } = useNodeEditor();
const ports = getNodePorts(nodeId);
```

## Common Issues

### Issue: "NodeDefinitionRegistry is required"
**Solution**: Ensure your NodeEditor is wrapped with NodeDefinitionProvider:
```typescript
<NodeDefinitionProvider nodeDefinitions={definitions}>
  <NodeEditor />
</NodeDefinitionProvider>
```

### Issue: Ports not appearing
**Solution**: Check that your NodeDefinition includes port configurations:
```typescript
const definition: NodeDefinition = {
  type: "myNode",
  displayName: "My Node",
  ports: [
    { id: "in", type: "input", label: "Input", position: "left" },
    { id: "out", type: "output", label: "Output", position: "right" }
  ]
};
```

### Issue: Custom port properties lost
**Solution**: Use PortOverrides for node-specific customizations:
```typescript
const node: NodeWithPortOverrides = {
  id: "node1",
  type: "myNode",
  portOverrides: [
    { portId: "in", maxConnections: 3 }
  ]
};
```

## Performance Considerations

The new system includes several performance optimizations:
- Port resolution results are cached per node
- Port lookup maps are memoized
- Cache is automatically cleared when nodes change

## Rollback Plan

If you need to rollback:

1. **Disable new features**:
   ```typescript
   setFeatureFlags({ 
     useInferredPortsOnly: false,
     saveInNewFormat: false 
   });
   ```

2. **Keep legacy data**:
   ```typescript
   // Save in old format
   prepareDataForSave(data, false);
   ```

3. **Use migration tools to convert back** (if needed)

## Future Plans

Once all users have migrated:
1. Remove `ports` field from Node interface
2. Remove legacy compatibility code
3. Make `useInferredPortsOnly` the default
4. Remove feature flags

## Support

For issues or questions:
- Check the console for migration warnings
- Use the FeatureFlagsPanel component for debugging
- Review the test cases in `__tests__/dataMigration.test.ts`