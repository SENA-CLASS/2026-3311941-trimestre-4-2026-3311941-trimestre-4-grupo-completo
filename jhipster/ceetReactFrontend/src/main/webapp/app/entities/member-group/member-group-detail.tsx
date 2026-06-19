import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './member-group.reducer';

export const MemberGroupDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const memberGroupEntity = useAppSelector(state => state.memberGroup.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="memberGroupDetailsHeading">
          <Translate contentKey="ceet2App.memberGroup.detail.title">MemberGroup</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{memberGroupEntity.id}</dd>
          <dt>
            <Translate contentKey="ceet2App.memberGroup.projectGroup">Project Group</Translate>
          </dt>
          <dd>{memberGroupEntity.projectGroup ? memberGroupEntity.projectGroup.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.memberGroup.apprentice">Apprentice</Translate>
          </dt>
          <dd>{memberGroupEntity.apprentice ? memberGroupEntity.apprentice.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/member-group" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/member-group/${memberGroupEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MemberGroupDetail;
