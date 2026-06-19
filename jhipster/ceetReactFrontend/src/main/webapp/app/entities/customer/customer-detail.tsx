import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './customer.reducer';

export const CustomerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const customerEntity = useAppSelector(state => state.customer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="customerDetailsHeading">
          <Translate contentKey="ceet2App.customer.detail.title">Customer</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{customerEntity.id}</dd>
          <dt>
            <span id="documentNumber">
              <Translate contentKey="ceet2App.customer.documentNumber">Document Number</Translate>
            </span>
          </dt>
          <dd>{customerEntity.documentNumber}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="ceet2App.customer.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="secondName">
              <Translate contentKey="ceet2App.customer.secondName">Second Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.secondName}</dd>
          <dt>
            <span id="fisrtLastName">
              <Translate contentKey="ceet2App.customer.fisrtLastName">Fisrt Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.fisrtLastName}</dd>
          <dt>
            <span id="secondLastName">
              <Translate contentKey="ceet2App.customer.secondLastName">Second Last Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.secondLastName}</dd>
          <dt>
            <Translate contentKey="ceet2App.customer.user">User</Translate>
          </dt>
          <dd>{customerEntity.user ? customerEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.customer.documentType">Document Type</Translate>
          </dt>
          <dd>{customerEntity.documentType ? customerEntity.documentType.documentName : ''}</dd>
        </dl>
        <Button as={Link as any} to="/customer" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/customer/${customerEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CustomerDetail;
