import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './area.reducer';

export const AreaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const areaEntity = useAppSelector(state => state.area.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="areaDetailsHeading">
          <Translate contentKey="ceet2App.area.detail.title">Area</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{areaEntity.id}</dd>
          <dt>
            <span id="areaName">
              <Translate contentKey="ceet2App.area.areaName">Area Name</Translate>
            </span>
          </dt>
          <dd>{areaEntity.areaName}</dd>
          <dt>
            <span id="urlLogo">
              <Translate contentKey="ceet2App.area.urlLogo">Url Logo</Translate>
            </span>
          </dt>
          <dd>{areaEntity.urlLogo}</dd>
          <dt>
            <span id="areaState">
              <Translate contentKey="ceet2App.area.areaState">Area State</Translate>
            </span>
          </dt>
          <dd>{areaEntity.areaState}</dd>
        </dl>
        <Button as={Link as any} to="/area" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/area/${areaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AreaDetail;
