from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in vms/__init__.py
from vms import __version__ as version

setup(
	name="vms",
	version=version,
	description="managing and engaging volunteers",
	author="Shridhar Patil",
	author_email="shridhar.p@zerodha.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
