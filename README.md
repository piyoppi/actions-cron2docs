# actions-cron2docs

GitHub Actions to convert crontab files to documentation

## Usage

``` yml
- uses: piyoppi/actions-cron2docs@mirrored
  with:
    # Crontab file name. Either this parameter or `cron_string` must be set.
    cron_file: ''

    # Crontab string. Either this parameter or `cron_file` must be set.
    cron_string: ''

    # (optional) File name of the output markdown.
    # If this parameter is given, a markdown file is saved.
    output_filename: ''

    # (optional) Language settings for output documents. One of the following values can be set.
    #  - ja
    #  - en
    # Defalt: ja
    language: ''

    # (optional) Directories containing the task's source code.
    task_dirs: ''

    # (optional) Yaml based document
    document_yaml_filename: ''
```

### Extracting comments from script

With parameter `task_dirs`, this Actions bundles the following comment extractors.

| Extractor | File type |
| --- | --- |
| [@piyoppi/cron2json-comment-extractor-php](/packages/comment-extractors/cron2json-comment-extractor-php/) | PHP File |
| [@piyoppi/cron2json-comment-extractor-shellscript](/packages/comment-extractors/cron2json-comment-extractor-shellscript/) | ShellScript File |

`task_dir` is specified to search for scripts. If a script is found, comments are extracted and written into the document.

### Documentation witten in Yaml file

With parameter `document_yaml_filename` you can write documents in Yaml format.
If the document is found in a Yaml file, the command extractor process is skipped.

```yaml
commands:
  - pattern: "\/path\/to\/daily-sales-script.sh"  # Regular expression matching the command
    comment:
      title: "Daily Sales Script"                 # Job title
      summary: "Tally yesterday's sales."         # Summary
```

## Example

### Workflow for updating the Wiki

The following is an example of outputting the markdown to the GitHub Wiki.

``` yml
jobs:
  update-wiki:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/checkout@v3
        with:
          repository: 'piyoppi/actions-sandbox.wiki'
          path: wiki

      - uses: piyoppi/actions-cron2docs@mirrored
        with:
          cron_file: ./crontab
          output_filename: ./wiki/docs.md

      - run: |
          git config --global user.email "bot@garakuta-toolbox.com"
          git config --global user.name "piyoppi-bot"
          git add docs.md
          git commit -m 'test commit'
          git push origin master
        working-directory: ./wiki
```

## License

The scripts in the [/src](src/) directory and documents of this project are released under the [MIT License](LICENSE).

The artifacts in the [/dist](dist/) directory created by this project contain third party material. For licensing and other copyright information, see [dist/licenses.txt](dist/licenses.txt).
