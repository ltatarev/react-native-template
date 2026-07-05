export const MODULE_NAME = 'featureFlag';

export const FEATURE_FLAGS = {
  SAMPLE_FEATURE: 'sampleFeature',
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];
