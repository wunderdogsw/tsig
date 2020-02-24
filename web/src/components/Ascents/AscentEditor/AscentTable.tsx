import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Avatar,
  useMediaQuery,
  Theme,
  TablePagination
} from "@material-ui/core";
import { SyncDisabled, Sync } from "@material-ui/icons";

import { Ascent, RouteType } from "../../../types/ascent";
import { removeAscent, syncAscents } from "../../../services/ascentService";
import useAscents from "../../../hooks/useAscents";
import EditAscentDialog from "./EditAscentDialog";
import { gradeValueToName } from "../AddAscents/GradeDialog";
import { useStyles, getIconByRouteType } from "../../common/styles";

type ListProps = {
  routeType?: RouteType;
  ascents?: Ascent[];
  setAscents?: React.Dispatch<React.SetStateAction<Ascent[]>>;
};

const AscentTable: React.FC<ListProps> = props => {
  const { routeType } = props;

  const isXsScreen = useMediaQuery((t: Theme) => t.breakpoints.down("xs"));
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAscent, setSelectedAscent] = useState<Ascent | null>(null);

  const handleRemoveAscent = async (ascent: Ascent) => {
    if (props.ascents && props.setAscents) {
      props.setAscents([...ascents.filter(a => a.id !== ascent.id)]);
      return;
    }
    await removeAscent(ascent, dispatch, history);
  };

  const handleSync = async () => {
    syncAscents(dispatch, history);
  };

  const ascents = props.ascents ?? useAscents().ascents;
  const filteredAscents = routeType
    ? ascents.filter(a => a.routeType === routeType)
    : ascents;

  const rowHeight = 53;
  const pageStartIndex = page * rowsPerPage;
  const pageEndIndex = (page + 1) * rowsPerPage;
  const emptyRows = Math.max(0, pageEndIndex - filteredAscents.length);

  const tableHead = (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        <TableCell>Grade</TableCell>
        {isXsScreen ? null : <TableCell>Ascent type</TableCell>}
        {isXsScreen ? null : <TableCell>Route type</TableCell>}
        <TableCell>Date</TableCell>
        <TableCell padding="checkbox" onClick={handleSync}>
          <Sync />
        </TableCell>
      </TableRow>
    </TableHead>
  );
  const tableBody = (
    <TableBody>
      {filteredAscents.slice(pageStartIndex, pageEndIndex).map(ascent => (
        <TableRow key={ascent.id} onClick={() => setSelectedAscent(ascent)}>
          <TableCell padding="checkbox">
            <Avatar className={classes[ascent.ascentType]}>
              {getIconByRouteType(ascent.routeType)}
            </Avatar>
          </TableCell>
          <TableCell>
            {gradeValueToName(ascent.gradeValue, ascent.routeType)}
          </TableCell>
          {isXsScreen ? null : <TableCell>{ascent.ascentType}</TableCell>}
          {isXsScreen ? null : <TableCell>{ascent.routeType}</TableCell>}
          <TableCell>{ascent.date.toLocaleDateString("fi")}</TableCell>
          <TableCell padding="checkbox">
            {ascent.status !== undefined ? <SyncDisabled /> : null}
          </TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 ? (
        <TableRow style={{ height: rowHeight * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      ) : null}
    </TableBody>
  );

  const table =
    filteredAscents.length > 0 ? (
      <>
        <TableContainer component={Paper}>
          <Table>
            {tableHead}
            {tableBody}
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredAscents.length}
          rowsPerPageOptions={[rowsPerPage]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </>
    ) : (
      <p>No ascents logged.</p>
    );

  return (
    <>
      <AutoSizer className={`${classes.autoSizer} ${classes.flexColumn}`}>
        {({ height }) => {
          const comfotablyFittingRows = Math.floor(height / rowHeight) - 3;
          setRowsPerPage(Math.min(20, comfotablyFittingRows));
          return table;
        }}
      </AutoSizer>
      {selectedAscent ? (
        <EditAscentDialog
          ascent={selectedAscent}
          setAscent={setSelectedAscent}
          removeAscent={handleRemoveAscent}
        />
      ) : null}
    </>
  );
};

export default AscentTable;
