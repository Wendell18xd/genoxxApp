import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

interface SegmentBottomProps {
  totalCount: number;
  selectedCount: number;
}

const SegmentBottom: React.FC<SegmentBottomProps> = ({
  totalCount,
  selectedCount,
}) => {
  const unselectedCount = totalCount - selectedCount;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.segmentContainer}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Todos ({totalCount})</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Seleccionados ({selectedCount})</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>
            No seleccionados ({unselectedCount})
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 13,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SegmentBottom;
