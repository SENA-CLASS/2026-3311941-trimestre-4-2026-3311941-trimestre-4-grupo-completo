import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './viewed-result.reducer';

export const ViewedResultDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const viewedResultEntity = useAppSelector(state => state.viewedResult.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="viewedResultDetailsHeading">
          <Translate contentKey="ceet2App.viewedResult.detail.title">ViewedResult</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{viewedResultEntity.id}</dd>
          <dt>
            <Translate contentKey="ceet2App.viewedResult.courseTrimester">Course Trimester</Translate>
          </dt>
          <dd>{viewedResultEntity.courseTrimester ? viewedResultEntity.courseTrimester.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.viewedResult.planning">Planning</Translate>
          </dt>
          <dd>{viewedResultEntity.planning ? viewedResultEntity.planning.planningCode : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.viewedResult.learningResult">Learning Result</Translate>
          </dt>
          <dd>{viewedResultEntity.learningResult ? viewedResultEntity.learningResult.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/viewed-result" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/viewed-result/${viewedResultEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ViewedResultDetail;
