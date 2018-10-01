import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  ButtonGroup,
  Card,
  Classes,
  HTMLTable,
  Icon,
  Position,
  Tooltip,
  Intent
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FactorTypes } from "../../../api/factor-types/factor-types.js";
import { updateFactorType } from "../../../api/factor-types/methods.js";
import AdminFactor from "./AdminFactor.jsx";
import AdminNewFactor from "./AdminNewFactor.jsx";
import AdminNewFactorType from "./AdminNewFactorType.jsx";
import Loading from "../Loading.jsx";

export default class AdminFactors extends React.Component {
  state = {};

  handleArchive = _id => {
    const { archived } = this.props;
    updateFactorType.call({ _id, archived: !archived });
  };

  render() {
    const { loading, archived, factors, factorTypes } = this.props;

    if (loading) {
      return <Loading />;
    }

    factorTypes.map(t => {
      t.factors = factors.filter(f => f.factorTypeId === t._id);
    });

    return (
      <div className="factors">
        <h2>
          <Icon
            className="admin-header-icon"
            icon={IconNames.PROPERTY}
            iconSize={Icon.SIZE_LARGE}
          />{" "}
          {archived ? "Archived Factors" : "Factors"}
        </h2>

        <div className="factors-list">
          {archived && factorTypes.length === 0 ? (
            <p>No archived Factors</p>
          ) : null}
          {factorTypes.map(t => {
            const hasNewForm = t.type !== "Boolean";

            const requiredType = FactorTypes.requiredTypes.includes(t.name);

            return (
              <Card className="factor" key={t._id}>
                <div className="factor-actions">
                  <ButtonGroup>
                    {requiredType ? null : (
                      <Tooltip
                        content={
                          archived ? (
                            ""
                          ) : (
                            <>
                              Archive <code>{t.name}</code>
                            </>
                          )
                        }
                        position={Position.TOP}
                      >
                        <Button
                          text={archived ? `Unarchive ${t.name}` : ""}
                          intent={archived ? Intent.SUCCESS : null}
                          icon={IconNames.BOX}
                          onClick={this.handleArchive.bind(this, t._id)}
                        />
                      </Tooltip>
                    )}

                    {archived || !hasNewForm ? (
                      ""
                    ) : (
                      <Tooltip
                        content={
                          <>
                            New <code>{t.name}</code> Factor Value
                          </>
                        }
                        position={Position.TOP}
                      >
                        <Button
                          icon={IconNames.PLUS}
                          onClick={() =>
                            this.setState({ [`newOpen${t._id}`]: true })
                          }
                        />
                      </Tooltip>
                    )}
                  </ButtonGroup>

                  {archived || !hasNewForm ? (
                    ""
                  ) : (
                    <AdminNewFactor
                      type={t}
                      onClose={() =>
                        this.setState({ [`newOpen${t._id}`]: false })
                      }
                      isOpen={this.state[`newOpen${t._id}`]}
                    />
                  )}
                </div>

                <h4 className={Classes.MONOSPACE_TEXT}>{t.name}</h4>

                {t.description ? (
                  <p className={Classes.TEXT_DISABLED}>{t.description}</p>
                ) : (
                  ""
                )}

                {archived ? null : t.factors.length > 0 ? (
                  <HTMLTable condensed>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.factors.map(factor => (
                        <AdminFactor key={factor._id} factor={factor} />
                      ))}
                    </tbody>
                  </HTMLTable>
                ) : (
                  <p className={Classes.TEXT_MUTED}>
                    No <code>{t.name}</code> factors yet.
                  </p>
                )}
              </Card>
            );
          })}
        </div>

        {archived ? (
          <p>
            <br />
            <Link to="/admin/factors">Back to Active Factors</Link>
          </p>
        ) : (
          <>
            <br />

            <Button
              text="New Factor"
              onClick={() => this.setState({ newFactorIsOpen: true })}
            />

            <AdminNewFactorType
              factors={factors}
              factorTypes={factorTypes}
              onClose={() => this.setState({ newFactorIsOpen: false })}
              isOpen={this.state.newFactorIsOpen}
            />

            <p>
              <br />
              <Link to="/admin/factors/archived">View Archived Factors</Link>
            </p>
          </>
        )}
      </div>
    );
  }
}