import { NodeDefinition } from './NodeDefinition';
/**
 * Input-only node that cannot have output connections
 */
export declare const InputOnlyNodeDefinition: NodeDefinition;
/**
 * Sink node that can only receive input (no output)
 */
export declare const SinkNodeDefinition: NodeDefinition;
/**
 * Processor node with limited inputs and placement constraints
 */
export declare const ConstrainedProcessorDefinition: NodeDefinition;
/**
 * Critical node that cannot be deleted easily
 */
export declare const CriticalNodeDefinition: NodeDefinition;
/**
 * Aggregator node that requires multiple inputs
 */
export declare const AggregatorNodeDefinition: NodeDefinition;
