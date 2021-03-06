import React from "react";
import styled from "@emotion/styled";
import {
  Card,
  H2,
  QuestionText,
  SEO,
  TextBlock,
  FileUpload,
  RadioButton,
  LabelText,
  AnswerBox,
  Glossary,
  WarningBox
} from "../components";
import {
  UserState,
  EarningsEnum,
  useUserState
} from "../library/user-state-context";
import {
  UserStateActions,
  useUserStateActions
} from "../library/user-state-actions-context";

export const SsaImage = styled("img")`
  border: 1px solid #dddddd;
  width: 500px;
  margin-top: 25px;
`;

const CardGlossaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;

  @media (max-width: 767px){
    display: block;
  }
`;

const HowToContainer = styled.div`
  display: block;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const TopQuestionAndTitle = styled.div`
width: 70%;
margin-bottom: 75px;
@media (max-width: 767px){
  width: 100%;
}
`;

const Link = styled.a`
  color: black;
  font-weight: 600;
  overflow-wrap: break-word;
`;

interface Prescreen1bProps {
  userState: UserState
  userStateActions: UserStateActions
}

class Prescreen1b extends React.Component<Prescreen1bProps> {
  constructor(props: Prescreen1bProps) {
    super(props);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.showManualTable = this.showManualTable.bind(this);
  }

  showFileUpload() {
    const {
      userState: { haveEarnings, haveSSAAccount, earningsFormat }
    } = this.props;
    return (
      (haveEarnings === false && haveSSAAccount === true) ||
      (haveEarnings === true &&
        (earningsFormat === EarningsEnum.XML ||
          earningsFormat === EarningsEnum.PDF))
    );
  }

  showManualTable() {
    const {
      userState: { haveEarnings, earningsFormat }
    } = this.props;
    return (
      haveEarnings === true &&
      (earningsFormat === EarningsEnum.PDFPRINT ||
        earningsFormat === EarningsEnum.PAPER)
    );
  }

  checkForBirthday = () => {
    const {
      userState: { birthDate }
    } = this.props;
    if (birthDate === null) {
      return (
        <WarningBox>
          <label>
            Please go back and fill out appropriate birthdate before going
            forward.{" "}
          </label>
        </WarningBox>
      );
    }

    return null;
  };

  render() {
    const {
      userState: { haveEarnings, haveSSAAccount, earningsFormat },
      userStateActions: { setHaveEarnings, setHaveSSAAccount, setEarningsFormat },
    } = this.props
    return (
      <React.Fragment>
        <SEO title="Prescreen 1b" keywords={[`social security`, `government`, `retirement`]} />
        <ContentContainer>
          <CardGlossaryContainer>
            <TopQuestionAndTitle><H2>Step 2: Earnings</H2>
              <TextBlock>
                Your Social Security retirement benefits are calculated based on your earnings in covered employment.
            </TextBlock>
              <br />
              <TextBlock>
                To calculate your Social Security retirement benefits, you will need a record of your earnings from Social Security.
                Follow the steps below to get your earning record.
            </TextBlock>
              {this.checkForBirthday()}

              <Card>
                <QuestionText>Do you have a copy of your earnings record?</QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="haveEarnings" value="true" onChange={() => setHaveEarnings(true)} checked={haveEarnings === true} />
                  <LabelText>Yes</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="haveEarnings" value="false" onChange={() => setHaveEarnings(false)} checked={haveEarnings === false} />
                  <LabelText>No</LabelText>
                </AnswerBox>
              </Card>
            </TopQuestionAndTitle>
            <Glossary
              title="MYSOCIALSECURITY"
              link="https://www.ssa.gov/myaccount/"
              linkText="Login or signup online for a MySocialSecurity using this link."
            >
              MySocialSecurity is the Social Security Administrations online service. With a MySocialSecurity account , you can download a copy of your earnings record to use for this question.
          </Glossary>

          </CardGlossaryContainer>

          {haveEarnings === true ?
            <Card>
              <QuestionText>What format is the copy of your earnings record?</QuestionText>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.XML} onChange={() => setEarningsFormat(EarningsEnum.XML)} checked={earningsFormat === EarningsEnum.XML} />
                <LabelText>XML file (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDF} onChange={() => setEarningsFormat(EarningsEnum.PDF)} checked={earningsFormat === EarningsEnum.PDF} />
                <LabelText>PDF (MySocialSecurity)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PDFPRINT} onChange={() => setEarningsFormat(EarningsEnum.PDFPRINT)} checked={earningsFormat === EarningsEnum.PDFPRINT} />
                <LabelText>PDF (scanned from print)</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="earningsFormat" value={EarningsEnum.PAPER} onChange={() => setEarningsFormat(EarningsEnum.PAPER)} checked={earningsFormat === EarningsEnum.PAPER} />
                <LabelText>Paper (mailed from SSA)</LabelText>
              </AnswerBox>
            </Card> : null
          }

          {haveEarnings === false ?
            <Card>
              <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
              <AnswerBox>
                <RadioButton type="radio" name="haveSSAAccount" value="true" onChange={() => setHaveSSAAccount(true)} checked={haveSSAAccount === true} />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton type="radio" name="haveSSAAccount" value="false" onChange={() => setHaveSSAAccount(false)} checked={haveSSAAccount === false} />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card> : null
          }

          {this.showFileUpload() ?
            <HowToContainer>
              <Card>
                <TextBlock>
                  Please upload your earnings record file
                  </TextBlock>
                <FileUpload manual={false} />
                <TextBlock>
                  Once you have uploaded your earnings record, click next and go forward.
                </TextBlock>
              </Card>
            </HowToContainer> : null

          }

          {this.showManualTable() && (
            <div>
              <CardGlossaryContainer>
                <Card>
                  <TextBlock>
                    Please enter the “Taxed Social Security Earnings” amounts from your earnings record.
                  </TextBlock>

                </Card>

                {
                  this.showFileUpload() == true && <Glossary
                    title="IMPORTED RECORDS"
                  >
                    The values are imported from the file that you upload.
                    Please review them for accuracy and correct any errors that you find.
                  </Glossary>
                }
                {
                  this.showManualTable() === true && <Glossary
                    title="MANUAL RECORDS"
                  >
                    Please review the values so that the years match
                    and correct any errors that you find. The first row
                    may be a different year than on the paper
                    document.
                  </Glossary>
                }
              </CardGlossaryContainer>
              <Card>
                <FileUpload manual={true} />
              </Card>
            </div>
          )
          }

        </ContentContainer>
      </React.Fragment>
  )
}
}

export default function Prescreen1bWrapper(): JSX.Element {
  const userState = useUserState();
  const userStateActions = useUserStateActions();
  return (
    <Prescreen1b userState={userState} userStateActions={userStateActions} />
  );
}
