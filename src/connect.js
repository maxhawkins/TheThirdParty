// @flow

import type React from 'React';
import type { Dispatch, State } from './types';

import { connect } from 'react-redux';

type MapStateToProps<OwnProps: Object, StateProps: Object> = (
  state: State,
  ownProps: OwnProps
) => StateProps;

type MapDispatchToProps<OwnProps: Object, DispatchProps: Object> =
  | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps)
  | DispatchProps;

type MergeProps<
  StateProps,
  DispatchProps: Object,
  OwnProps: Object,
  Props: Object
> = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
) => Props;

type ConnectOptions = {
  pure?: boolean,
  areStatesEqual?: boolean,
  areOwnPropsEqual?: boolean,
  areStatePropsEqual?: boolean,
  areMergedPropsEqual?: boolean,
  storeKey?: boolean,
  withRef?: boolean,
};

export type ExplicitConnectOptions<
  OwnProps: Object,
  StateProps: Object,
  DispatchProps: Object
> = {
  mapStateToProps?: MapStateToProps<OwnProps, StateProps>,
  mapDispatchToProps?: MapDispatchToProps<OwnProps, DispatchProps>,
  mergeProps?: MergeProps<
    StateProps,
    DispatchProps,
    OwnProps,
    ConnectedProps<OwnProps, StateProps, DispatchProps>
  >,
  options?: ConnectOptions,
  component: React.ComponentType<
    ConnectedProps<OwnProps, StateProps, DispatchProps>
  >,
};

export type ConnectedProps<
  OwnProps: Object,
  StateProps: Object,
  DispatchProps: Object
> = $ReadOnly<{|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}>;

export type ConnectedComponent<
  OwnProps: Object,
  StateProps: Object,
  DispatchProps: Object
> =
  | React.ComponentType<ConnectedProps<OwnProps, StateProps, DispatchProps>>
  | React.StatelessFunctionalComponent<
      ConnectedProps<OwnProps, StateProps, DispatchProps>
    >;

/**
 * react-redux's connect function is too polymorphic and problematic. This function
 * is a wrapper to simplify the typing of connect and make it more explicit, and
 * less magical.
 */
export default function explicitConnect<
  OwnProps: Object,
  StateProps: Object,
  DispatchProps: Object
>(
  connectOptions: ExplicitConnectOptions<OwnProps, StateProps, DispatchProps>
): React.ComponentType<OwnProps> {
  const {
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options,
    component,
  } = connectOptions;

  // Opt out of the flow-typed definition of react-redux's connect, and use our own.
  return (connect: any)(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(component);
}
