import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './level-education.reducer';

export const LevelEducationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const levelEducationEntity = useAppSelector(state => state.levelEducation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="levelEducationDetailsHeading">
          <Translate contentKey="ceetApp.levelEducation.detail.title">LevelEducation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{levelEducationEntity.id}</dd>
          <dt>
            <span id="levelName">
              <Translate contentKey="ceetApp.levelEducation.levelName">Level Name</Translate>
            </span>
          </dt>
          <dd>{levelEducationEntity.levelName}</dd>
          <dt>
            <span id="stateLevelEducation">
              <Translate contentKey="ceetApp.levelEducation.stateLevelEducation">State Level Education</Translate>
            </span>
          </dt>
          <dd>{levelEducationEntity.stateLevelEducation}</dd>
        </dl>
        <Button as={Link as any} to="/level-education" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/level-education/${levelEducationEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LevelEducationDetail;
