import { Field, Form, Formik } from "formik"
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, KeyboardEventHandler } from "react"

const initialValues = {
  title: "",
  description: "",
  body: "",
  tagList: []
}

export const ArticleCreateForm = () => {

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {

    }
  }

  const handleOnSubmit = () => {

  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              <li>That title is required</li>
            </ul>

            <Formik
              initialValues={initialValues}
              onSubmit={handleOnSubmit}
            >


              <Form>
                <fieldset>
                  <fieldset className="form-group">
                    <Field name="title" type="text" className="form-control form-control-lg" placeholder="Article Title" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field name="description" type="text" className="form-control" placeholder="What's this article about?" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field
                      name="body"
                      as="textarea"
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field name="tagList" type="text" className="form-control" placeholder="Enter tags"
                      onKeyUp={handleAddTag}
                    />
                    <div className="tag-list">
                      <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </div>
  )
}
