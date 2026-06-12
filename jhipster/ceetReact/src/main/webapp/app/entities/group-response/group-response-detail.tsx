import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './group-response.reducer';

export const GroupResponseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const groupResponseEntity = useAppSelector(state => state.groupResponse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="groupResponseDetailsHeading">
          <Translate contentKey="ceetApp.groupResponse.detail.title">GroupResponse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{groupResponseEntity.id}</dd>
          <dt>
            <span id="evaluationDate">
              <Translate contentKey="ceetApp.groupResponse.evaluationDate">Evaluation Date</Translate>
            </span>
          </dt>
          <dd>
            {groupResponseEntity.evaluationDate ? (
              <TextFormat value={groupResponseEntity.evaluationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ceetApp.groupResponse.projectGroup">Project Group</Translate>
          </dt>
          <dd>{groupResponseEntity.projectGroup ? groupResponseEntity.projectGroup.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.groupResponse.assessment">Assessment</Translate>
          </dt>
          <dd>{groupResponseEntity.assessment ? groupResponseEntity.assessment.assessmentType : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.groupResponse.itemList">Item List</Translate>
          </dt>
          <dd>{groupResponseEntity.itemList ? groupResponseEntity.itemList.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/group-response" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/group-response/${groupResponseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GroupResponseDetail;
