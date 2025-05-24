from setuptools import setup, find_packages

setup(
    name="cira-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "python-dotenv",
        "requests",
        "beautifulsoup4",
        "slowapi",
        "fake-useragent",
        "selenium",
        "free-proxy",
        "redis",
        "aiohttp",
        "retrying",
        "webdriver-manager"
    ]
)
