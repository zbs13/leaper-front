import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native';
import NoData from './NoData';

/**
 * refresh view for scrollable view
 * 
 * @param {component} children children 
 * @param {object} _style style
 * @param {function} onRefresh function called on refresh view
 * @returns 
 */
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

/**
 * refresh view for list view
 * 
 * @param {component} children children 
 * @param {object} _style style
 * @param {function} onRefresh function called on refresh view
 * @param {object} data object with datas
 * @param {string} noDataMessage message if no data 
 * @param {function} renderItem function rendering
 * @param {function} onEndReached function called if list scroll ended
 * @returns 
 */
export const RefreshViewList = ({
  children, 
  _style, 
  onRefresh, 
  data, 
  noDataMessage, 
  renderItem, 
  onEndReached
}) => {
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
      ListEmptyComponent={() => <NoData message={noDataMessage} />}
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