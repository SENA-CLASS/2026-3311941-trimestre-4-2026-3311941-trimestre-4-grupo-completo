import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bonding.reducer';

export const BondingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const bondingEntity = useAppSelector(state => state.bonding.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bondingDetailsHeading">
          <Translate contentKey="ceetApp.bonding.detail.title">Bonding</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bondingEntity.id}</dd>
          <dt>
            <span id="bondingType">
              <Translate contentKey="ceetApp.bonding.bondingType">Bonding Type</Translate>
            </span>
          </dt>
          <dd>{bondingEntity.bondingType}</dd>
          <dt>
            <span id="workingHours">
              <Translate contentKey="ceetApp.bonding.workingHours">Working Hours</Translate>
            </span>
          </dt>
          <dd>{bondingEntity.workingHours}</dd>
          <dt>
            <span id="bondingState">
              <Translate contentKey="ceetApp.bonding.bondingState">Bonding State</Translate>
            </span>
          </dt>
          <dd>{bondingEntity.bondingState}</dd>
        </dl>
        <Button as={Link as any} to="/bonding" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/bonding/${bondingEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BondingDetail;
