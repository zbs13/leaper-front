import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native';

export const RefreshViewScroll = ({children, _style, onRefresh}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshAction = React.useCallback(async() => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={_style}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshAction}
          />
        }
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export const RefreshViewList = ({children, _style, onRefresh, data, renderItem, onEndReached}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshAction = React.useCallback(async() => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <FlatList
      contentContainerStyle={_style}
      data={data}
      renderItem={renderItem}
      keyExtractor={(data, index) => index.toString()}
      onEndReachedThreshold={0.3}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshAction}
        />
      }
    >
      {children}
    </FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});