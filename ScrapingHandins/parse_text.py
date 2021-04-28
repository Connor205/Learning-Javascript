text = """| REPORT CONTENT             | Missing | Beginning / Developing | Meets Expectations | Excellent / Advanced |
|----------------------------+---------+------------------------+--------------------+----------------------|
| General problem area       |         |                        |                    |                      |
| Approach                   |         |                        |                    |                      |
| Methodology                |         |                        |                    |                      |
| Metrics                    |         |                        |                    |                      |
| Summary                    |         |                        |                    |                      |
|----------------------------+---------+------------------------+--------------------+----------------------|
| SOFTWARE                   | Missing | Beginning / Developing | Meets Expectations | Excellent / Advanced |
|----------------------------+---------+------------------------+--------------------+----------------------|
| Well-written documentation |         |                        |                    |                      |
| Source code                |         |                        |                    |                      |
| Tests                      |         |                        |                    |                      |
| Incidental code quality    |         |                        |                    |                      |
|----------------------------+---------+------------------------+--------------------+----------------------|
| REPORT STYLE/WRITING       | Missing | Beginning / Developing | Meets Expectations | Excellent / Advanced |
|----------------------------+---------+------------------------+--------------------+----------------------|
| Organization               |         |                        |                    |                      |
| Depth/Emphasis             |         |                        |                    |                      |
| Language                   |         |                        |                    |                      |
| Mechanics                  |         |                        |                    |                      |
| Minor Errors               |         |                        |                    |                      |
|----------------------------+---------+------------------------+--------------------+----------------------|
| PRESENTATION/DEMONSTRATION | Missing | Beginning / Developing | Meets Expectations | Excellent / Advanced |
|----------------------------+---------+------------------------+--------------------+----------------------|
| Organization               |         |                        |                    |                      |
| Depth/Emphasis             |         |                        |                    |                      |
| Program Demonstration      |         |                        |                    |                      |
| Style                      |         |                        |                    |                      |
| Teamwork                   |         |                        |                    |                      |
|----------------------------+---------+------------------------+--------------------+----------------------|
| RECEIPT                                                                                                   |
|-----------------------------------------------------------------------------------------------------------|"""
print(text.replace("|", "").replace("-", "").replace("+", ""))